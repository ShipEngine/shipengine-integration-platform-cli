import { Suite, TestProp, expect } from "../tiny-test";
import { buildAddressWithContactInfo } from "../factories/address";
import { v4 } from "uuid";
import {
  CarrierApp,
  NewShipmentPOJO,
  NewPackagePOJO,
  WeightUnit,
  TransactionPOJO,
} from "@shipengine/integration-platform-sdk";

type CreateShipmentProps = [TransactionPOJO, NewShipmentPOJO];

export class CreateShipmentTestSuite extends Suite {
  title = "createShipment";

  tests() {
    const carrierApp = this.app as CarrierApp;

    return this.testProps().map((testProp) => {
      return this.test(testProp.title, async function () {
        let result, errorResult;
        try {
          carrierApp.createShipment &&
            (result = await carrierApp.createShipment(...testProp.props));
        } catch (error) {
          errorResult = error;
        } finally {
          expect(errorResult).to.be.undefined;
          expect(result).to.be.ok;
        }
      });
    });
  }

  private testProps(): TestProp<CreateShipmentProps>[] {
    const carrierApp = this.app as CarrierApp;
    let props: TestProp<CreateShipmentProps>[] = [];

    const packageWeights = [1.0, 10.0, 100.0];
    const packageUnits = [
      WeightUnit.Grams,
      WeightUnit.Kilograms,
      WeightUnit.Ounces,
      WeightUnit.Pounds,
    ];
    // const dateTimes = {
    //   now: "",
    //   tomorrow: "",
    //   yesterday: "",
    // };

    for (let deliveryService of carrierApp.deliveryServices) {
      for (let labelFormat of deliveryService.labelFormats) {
        for (let labelSize of deliveryService.labelSizes) {
          for (let deliveryConfirmation of deliveryService.deliveryConfirmations) {
            for (let packageUnit of packageUnits) {
              for (let packageWeight of packageWeights) {
                //   for (let originCountry of deliveryService.originCountries) {
                //     for (let destinationCountry of deliveryService.destinationCountries) {
                //       for (let package of deliveryService.packaging) {
                //       }
                //     }
                //   }

                let transactionPOJO: TransactionPOJO = {
                  id: v4(),
                  isRetry: false,
                  useSandbox: false,
                  session: {
                    id: v4(),
                  },
                };

                const packagePOJO: NewPackagePOJO = {
                  deliveryConfirmation: {
                    id: deliveryConfirmation.id,
                  },
                  packaging: {
                    id: deliveryService.packaging[0].id,
                  },
                  label: {
                    size: labelSize,
                    format: labelFormat,
                  },
                  weight: {
                    value: packageWeight,
                    unit: packageUnit,
                  },
                };

                let newShipmentPOJO: NewShipmentPOJO = {
                  deliveryService: {
                    id: deliveryService.id,
                  },
                  shipFrom: buildAddressWithContactInfo("US"),
                  shipTo: buildAddressWithContactInfo("US"),
                  shipDateTime: new Date(),
                  packages: [packagePOJO],
                };

                const title = `creates a shipment with delivery service: ${deliveryService.name}, label format: ${labelFormat}, label size: ${labelSize}, delivery confirmation: ${deliveryConfirmation.name}, package unit: ${packageUnit}, and package weight: ${packageWeight}`;

                props.push({
                  title: title,
                  props: [transactionPOJO, newShipmentPOJO],
                });
              }
            }
          }
        }
      }
    }

    return props;
  }
}

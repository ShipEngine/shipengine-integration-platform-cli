/* eslint-disable camelcase */

import { CreateShipmentInternationalConfigOptions } from "./config/create-shipment-international";
import { CreateShipmentDomesticConfigOptions } from "./config/create-shipment-domestic";
import { CreateShipmentMultiPackageConfigOptions } from './config/create-shipment-multipackage';
import { CreateShipmentWithInsuranceConfigOptions } from './config/create-shipment-insurance';
import { RateShipmentConfigOptions } from './config/rate-shipment';
import { RateShipmentWithAllServicesConfigOptions } from './config/rate-shipment-with-all-services';
import { CancelShipmentsSingleConfigOptions } from './config/cancel-shipments-single';
import { CancelShipmentsMultipleConfigOptions } from './config/cancel-shipments-multiple';
import { CreateShipmentReturnConfigOptions } from './config/create-shipment-return';
import { SameDayPickupConfigOptions } from './config/same-day-pickup';
import { RateShipmentReturnConfigOptions } from './config/rate-shipment-return';
import { NextDayPickupConfigOptions } from './config/next-day-pickup';
import { TrackShipmentConfigOptions } from './config/track-shipment';
import { TrackShipmentReturnConfigOptions } from './config/track-shipment-return';
import { CancelPickupsSameDayConfigOptions } from './config/cancel-pickups-same-day';

export interface TestsConfig {
  cancelShipments_single?: CancelShipmentsSingleConfigOptions | [CancelShipmentsSingleConfigOptions];
  cancelShipments_multiple?: CancelShipmentsMultipleConfigOptions | [CancelShipmentsMultipleConfigOptions];
  createShipment_domestic?:
  | CreateShipmentDomesticConfigOptions
  | [CreateShipmentDomesticConfigOptions];
  createShipment_international?:
  | CreateShipmentInternationalConfigOptions
  | [CreateShipmentInternationalConfigOptions];
  createShipment_multi_package?: CreateShipmentMultiPackageConfigOptions | [CreateShipmentMultiPackageConfigOptions];
  createShipment_with_insurance?: CreateShipmentWithInsuranceConfigOptions | [CreateShipmentWithInsuranceConfigOptions];
  createShipment_return?: CreateShipmentReturnConfigOptions | [CreateShipmentReturnConfigOptions];
  rateShipment?: RateShipmentConfigOptions | [RateShipmentConfigOptions];
  rateShipment_with_all_services?: RateShipmentWithAllServicesConfigOptions | [RateShipmentWithAllServicesConfigOptions];
  rateShipment_return?: RateShipmentReturnConfigOptions | [RateShipmentReturnConfigOptions];
  schedulePickup_same_day?: SameDayPickupConfigOptions | [SameDayPickupConfigOptions];
  schedulePickup_next_day?: NextDayPickupConfigOptions | [NextDayPickupConfigOptions];
  trackShipment?: TrackShipmentConfigOptions | [TrackShipmentConfigOptions];
  trackReturnShipment?: TrackShipmentReturnConfigOptions | [TrackShipmentReturnConfigOptions];

  cancelPickups_same_day?: CancelPickupsSameDayConfigOptions | [CancelPickupsSameDayConfigOptions];
}

export default interface Config {
  connectArgs?: object;
  debug?: boolean;
  failFast?: boolean;
  retries?: number;
  session?: object;
  tests?: TestsConfig;
  timeout?: number;
}

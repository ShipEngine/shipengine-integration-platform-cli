import { Transaction, SalesOrderShipment } from "@shipengine/integration-platform-sdk";
import { Session } from "./session";

/**
 * Logs in using the username and password entered on the login form
 */
export default async function shipmentCancelled(
  transaction: Transaction<Session>,
  shipment: SalesOrderShipment,
): Promise<void> {
  throw new Error("NotImplementedError");
  // STEP 1: Validation
  // STEP 2: Create the data that the carrier's API expects
  // STEP 3: Call the carrier's API
  // Step 4: Create the output data that ShipEngine expects
}
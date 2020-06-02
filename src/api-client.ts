import ShipengineAPIClient from "./shipengine-api-client";
import netrc from "netrc";
import cli from "cli-ux";

export default class APIClient extends ShipengineAPIClient {
  /**
   * Here we can do things related to networking but that should not be coupled in the actual API client implementation
   * - set the header for which version of the CLI is calling the API
   * - check to see if the user is logged in w/ the API key
   */

  get isLoggedIn(): boolean {
    return this.apiKey !== "";
  }

  async login(): Promise<boolean> {
    const myNetrc = netrc();
    let seNetRC = myNetrc["shipengine.com"] as { apiKey?: string };

    if (!seNetRC || !seNetRC.apiKey) {
      const apiKey = await cli.prompt("Please enter your ShipEngine API Key.");

      try {
        await this.validateAPIKey(apiKey);
        this.apiKey = apiKey;
        Object.assign(myNetrc["shipengine.com"] = {}, { apiKey })

        netrc.save(myNetrc);
        return true;
      }
      catch (error) {
        const err = error as Error;
        console.error("Error validating your API Key, please try again:", err.message);
        return false;
      }
    }
    else {
      this.apiKey = seNetRC.apiKey;
      return true;
    }
  }

  constructor() {
    super();
  }
}

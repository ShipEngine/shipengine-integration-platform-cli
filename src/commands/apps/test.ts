import BaseCommand from "../../base-command";
import loadAndValidateApp from "../../core/load-and-validate-app";
import testApp from "../../core/test-app";
import { flags } from "@oclif/command";
import {
  logFail,
  logPass,
  logStep,
  logResults,
} from "../../core/utils/log-helpers";

export default class Test extends BaseCommand {
  static description = "test your app";

  static examples = [
    "$ shipengine apps:test",
    "$ shipengine apps:test --grep rateShipment",
  ];

  static flags = {
    help: flags.help({
      char: "h",
      description: "show help for the apps:test command",
    }),
    debug: flags.boolean({
      char: "d",
      description: "logs additional debug information",
    }),
    timeout: flags.integer({
      char: "t",
      description: "specify the timeout for all the test",
    }),
    retries: flags.integer({
      char: "r",
      description: "specify the retries for all the test",
    }),
    grep: flags.string({
      char: "g",
      description: "only run test that match the given string",
    }),
    "fail-fast": flags.boolean({
      char: "f",
      description: "stop running the test suite on the first failed test",
    }),
  };

  async run() {
    this.parse(Test);
    const { flags } = this.parse(Test);
    const { "fail-fast": failFast, debug, grep, retries, timeout } = flags;
    const pathToApp = process.cwd();

    try {
      logStep("validating app structure");

      await loadAndValidateApp(pathToApp);

      logPass("app structure is valid");

      const results = await testApp(pathToApp, {
        debug,
        failFast,
        grep,
        retries,
        timeout,
      });

      if (results.failed > 0) {
        return this.exit(1);
      }
    } catch (error) {
      switch (error.code) {
        case "INVALID_APP":
          // eslint-disable-next-line no-case-declarations
          const errorsCount = error.errors.length;
          // eslint-disable-next-line no-case-declarations
          const errorsWithInflection = errorsCount > 1 ? "errors" : "error";

          logFail(
            `App structure is not valid - ${errorsCount} ${errorsWithInflection} found`,
          );

          error.errors.forEach((errorMessage: string) => {
            logFail(errorMessage);
          });

          logResults({ failed: errorsCount, passed: 0, skipped: 0 });
          return this.exit(1);
        default:
          throw error;
      }
    }
  }
}

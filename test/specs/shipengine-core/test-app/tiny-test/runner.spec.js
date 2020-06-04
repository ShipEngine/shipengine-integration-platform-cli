"use strict";

const { expect } = require("chai");
const {
  Runner,
} = require("../../../../../lib/shipengine-core/test-app/tiny-test/runner");
const {
  Suite,
} = require("../../../../../lib/shipengine-core/test-app/tiny-test");

class MockSuite extends Suite {
  constructor(props) {
    super(props);
    this.title = "passing test suite";
  }

  tests() {
    return [
      this.test("a passing test", () => {
        // eslint-disable-next-line no-self-compare
        expect(true).to.equal(true);
      }),
    ];
  }
}

class FailingMockSuite extends Suite {
  constructor(props) {
    super(props);
    this.title = "failing test suite";
  }

  tests() {
    return [
      this.test("a failing test", () => {
        // eslint-disable-next-line no-self-compare
        expect(true).to.equal(false);
      }),
    ];
  }
}

describe("Runner", () => {
  it("runs test suites", async () => {
    const mockApp = { type: "carrier" };
    const suiteA = new MockSuite(mockApp);
    const suites = [suiteA];
    const options = { failFast: false, concurrency: 1, debug: false };
    const results = await new Runner(suites, options).run();
    expect(results.passed).to.equal(1);
    expect(results.skipped).to.equal(0);
    expect(results.failed).to.equal(0);
  });

  it("counts the failures", async () => {
    const mockApp = { type: "carrier" };
    const suiteA = new FailingMockSuite(mockApp);
    const suites = [suiteA];
    const options = { failFast: false, concurrency: 1, debug: false };
    const results = await new Runner(suites, options).run();
    expect(results.passed).to.equal(0);
    expect(results.skipped).to.equal(0);
    expect(results.failed).to.equal(1);
  });
});
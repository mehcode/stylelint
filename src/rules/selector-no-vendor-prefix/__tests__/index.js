import { testRule } from "../../../testUtils"
import rules from "../../../rules"
import { ruleName, messages } from ".."

const rule = rules[ruleName]

testRule(rule, {
  ruleName,
  config: [undefined],

  accept: [ {
    code: ":fullscreen a {}",
  }, {
    code: ":root { --custom-property: {} }",
  }, {
    code: "input::placeholder { color: pink; }",
  }, {
    code: "a::before {}",
    description: "handles pseudo-element",
  }, {
    code: "a:hover {}",
    description: "handles pseudo-class",
  }, {
    code: "a[data-foo=\":-webkit-full-screen\"] {}",
    description: "string",
  } ],

  reject: [ {
    code: ":-webkit-full-screen a {}",
    message: messages.rejected(":-webkit-full-screen"),
    line: 1,
    column: 1,
  }, {
    code: ":-wEbKiT-fUlL-sCrEeN a {}",
    message: messages.rejected(":-wEbKiT-fUlL-sCrEeN"),
    line: 1,
    column: 1,
  }, {
    code: ":-WEBKIT-FULL-SCREEN a {}",
    message: messages.rejected(":-WEBKIT-FULL-SCREEN"),
    line: 1,
    column: 1,
  }, {
    code: "body, :-ms-fullscreen a {}",
    message: messages.rejected(":-ms-fullscreen"),
    line: 1,
    column: 7,
  }, {
    code: "input:-moz-placeholder, input::placeholder { color: pink; }",
    message: messages.rejected(":-moz-placeholder"),
    line: 1,
    column: 6,
  }, {
    code: "input::-moz-placeholder { color: pink; }",
    message: messages.rejected("::-moz-placeholder"),
    line: 1,
    column: 6,
  }, {
    code: "input::-webkit-input-placeholder { color: pink; }",
    message: messages.rejected("::-webkit-input-placeholder"),
  } ],
})

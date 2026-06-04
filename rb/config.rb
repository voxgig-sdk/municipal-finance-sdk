# MunicipalFinance SDK configuration

module MunicipalFinanceConfig
  def self.make_config
    {
      "main" => {
        "name" => "MunicipalFinance",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://municipaldata.treasury.gov.za/api",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "aged_creditor" => {},
          "aged_debtor" => {},
          "fact" => {},
        },
      },
      "entity" => {
        "aged_creditor" => {
          "fields" => [
            {
              "name" => "amount_sum",
              "req" => false,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "amount_type_code",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "amount_type_label",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "demarcation_code",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 3,
            },
            {
              "name" => "demarcation_label",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 4,
            },
            {
              "name" => "financial_period_period",
              "req" => false,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 5,
            },
            {
              "name" => "financial_year_end_year",
              "req" => false,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 6,
            },
            {
              "name" => "item_code",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 7,
            },
            {
              "name" => "item_composition",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 8,
            },
            {
              "name" => "item_label",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 9,
            },
            {
              "name" => "item_position_in_return_form",
              "req" => false,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 10,
            },
            {
              "name" => "item_return_form_structure",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 11,
            },
            {
              "name" => "period_length_length",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 12,
            },
          ],
          "name" => "aged_creditor",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "amount.sum",
                        "kind" => "query",
                        "name" => "aggregate",
                        "orig" => "aggregate",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "example" => "financial_year_end.year:2020|demarcation.code:CPT",
                        "kind" => "query",
                        "name" => "cut",
                        "orig" => "cut",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "example" => "item.code|financial_period.period",
                        "kind" => "query",
                        "name" => "drilldown",
                        "orig" => "drilldown",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "example" => "financial_period.period:asc",
                        "kind" => "query",
                        "name" => "order",
                        "orig" => "order",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "page",
                        "orig" => "page",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                      {
                        "example" => 10000,
                        "kind" => "query",
                        "name" => "pagesize",
                        "orig" => "pagesize",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/cubes/aged_creditor/facts",
                  "parts" => [
                    "cubes",
                    "aged_creditor",
                    "facts",
                  ],
                  "select" => {
                    "$action" => "fact",
                    "exist" => [
                      "aggregate",
                      "cut",
                      "drilldown",
                      "order",
                      "page",
                      "pagesize",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "aggregate",
                        "orig" => "aggregate",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "cut",
                        "orig" => "cut",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "drilldown",
                        "orig" => "drilldown",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "order",
                        "orig" => "order",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "page",
                        "orig" => "page",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                      {
                        "example" => 10000,
                        "kind" => "query",
                        "name" => "pagesize",
                        "orig" => "pagesize",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/cubes/aged_creditor_v2/facts",
                  "parts" => [
                    "cubes",
                    "aged_creditor_v2",
                    "facts",
                  ],
                  "select" => {
                    "exist" => [
                      "aggregate",
                      "cut",
                      "drilldown",
                      "order",
                      "page",
                      "pagesize",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 1,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "aged_debtor" => {
          "fields" => [
            {
              "name" => "amount_sum",
              "req" => false,
              "type" => "`$NUMBER`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "amount_type_code",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "amount_type_label",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "customer_group_code",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 3,
            },
            {
              "name" => "demarcation_code",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 4,
            },
            {
              "name" => "demarcation_label",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 5,
            },
            {
              "name" => "financial_period_period",
              "req" => false,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 6,
            },
            {
              "name" => "financial_year_end_year",
              "req" => false,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 7,
            },
            {
              "name" => "item_code",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 8,
            },
            {
              "name" => "item_composition",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 9,
            },
            {
              "name" => "item_label",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 10,
            },
            {
              "name" => "item_position_in_return_form",
              "req" => false,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 11,
            },
            {
              "name" => "item_return_form_structure",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 12,
            },
            {
              "name" => "period_length_length",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 13,
            },
          ],
          "name" => "aged_debtor",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "aggregate",
                        "orig" => "aggregate",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "example" => "financial_year_end.year:2020|customer_group.code:households",
                        "kind" => "query",
                        "name" => "cut",
                        "orig" => "cut",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "example" => "item.code|customer_group.code",
                        "kind" => "query",
                        "name" => "drilldown",
                        "orig" => "drilldown",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "order",
                        "orig" => "order",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "page",
                        "orig" => "page",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                      {
                        "example" => 10000,
                        "kind" => "query",
                        "name" => "pagesize",
                        "orig" => "pagesize",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/cubes/aged_debtor/facts",
                  "parts" => [
                    "cubes",
                    "aged_debtor",
                    "facts",
                  ],
                  "select" => {
                    "$action" => "fact",
                    "exist" => [
                      "aggregate",
                      "cut",
                      "drilldown",
                      "order",
                      "page",
                      "pagesize",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "aggregate",
                        "orig" => "aggregate",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "cut",
                        "orig" => "cut",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "drilldown",
                        "orig" => "drilldown",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "order",
                        "orig" => "order",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "example" => 0,
                        "kind" => "query",
                        "name" => "page",
                        "orig" => "page",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                      {
                        "example" => 10000,
                        "kind" => "query",
                        "name" => "pagesize",
                        "orig" => "pagesize",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/cubes/aged_debtor_v2/facts",
                  "parts" => [
                    "cubes",
                    "aged_debtor_v2",
                    "facts",
                  ],
                  "select" => {
                    "exist" => [
                      "aggregate",
                      "cut",
                      "drilldown",
                      "order",
                      "page",
                      "pagesize",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 1,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "fact" => {
          "fields" => [
            {
              "name" => "cell",
              "req" => false,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "summary",
              "req" => false,
              "type" => "`$OBJECT`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "total_cell_count",
              "req" => false,
              "type" => "`$INTEGER`",
              "active" => true,
              "index$" => 2,
            },
          ],
          "name" => "fact",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "cut",
                        "orig" => "cut",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "drilldown",
                        "orig" => "drilldown",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/cubes/audit_opinions/facts",
                  "parts" => [
                    "cubes",
                    "audit_opinions",
                    "facts",
                  ],
                  "select" => {
                    "exist" => [
                      "cut",
                      "drilldown",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "cut",
                        "orig" => "cut",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "drilldown",
                        "orig" => "drilldown",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/cubes/bsheet/facts",
                  "parts" => [
                    "cubes",
                    "bsheet",
                    "facts",
                  ],
                  "select" => {
                    "exist" => [
                      "cut",
                      "drilldown",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 1,
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "cut",
                        "orig" => "cut",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "drilldown",
                        "orig" => "drilldown",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/cubes/capital/facts",
                  "parts" => [
                    "cubes",
                    "capital",
                    "facts",
                  ],
                  "select" => {
                    "exist" => [
                      "cut",
                      "drilldown",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 2,
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "cut",
                        "orig" => "cut",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "drilldown",
                        "orig" => "drilldown",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/cubes/capital_v2/facts",
                  "parts" => [
                    "cubes",
                    "capital_v2",
                    "facts",
                  ],
                  "select" => {
                    "exist" => [
                      "cut",
                      "drilldown",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 3,
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "cut",
                        "orig" => "cut",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "drilldown",
                        "orig" => "drilldown",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/cubes/cflow/facts",
                  "parts" => [
                    "cubes",
                    "cflow",
                    "facts",
                  ],
                  "select" => {
                    "exist" => [
                      "cut",
                      "drilldown",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 4,
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "cut",
                        "orig" => "cut",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "drilldown",
                        "orig" => "drilldown",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/cubes/cflow_v2/facts",
                  "parts" => [
                    "cubes",
                    "cflow_v2",
                    "facts",
                  ],
                  "select" => {
                    "exist" => [
                      "cut",
                      "drilldown",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 5,
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "cut",
                        "orig" => "cut",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "drilldown",
                        "orig" => "drilldown",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/cubes/conditional_grants/facts",
                  "parts" => [
                    "cubes",
                    "conditional_grants",
                    "facts",
                  ],
                  "select" => {
                    "exist" => [
                      "cut",
                      "drilldown",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 6,
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "cut",
                        "orig" => "cut",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "drilldown",
                        "orig" => "drilldown",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/cubes/demarcation_changes/facts",
                  "parts" => [
                    "cubes",
                    "demarcation_changes",
                    "facts",
                  ],
                  "select" => {
                    "exist" => [
                      "cut",
                      "drilldown",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 7,
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "cut",
                        "orig" => "cut",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "drilldown",
                        "orig" => "drilldown",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/cubes/financial_position_v2/facts",
                  "parts" => [
                    "cubes",
                    "financial_position_v2",
                    "facts",
                  ],
                  "select" => {
                    "exist" => [
                      "cut",
                      "drilldown",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 8,
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "cut",
                        "orig" => "cut",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "drilldown",
                        "orig" => "drilldown",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/cubes/grants_v2/facts",
                  "parts" => [
                    "cubes",
                    "grants_v2",
                    "facts",
                  ],
                  "select" => {
                    "exist" => [
                      "cut",
                      "drilldown",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 9,
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "cut",
                        "orig" => "cut",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "drilldown",
                        "orig" => "drilldown",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/cubes/incexp/facts",
                  "parts" => [
                    "cubes",
                    "incexp",
                    "facts",
                  ],
                  "select" => {
                    "exist" => [
                      "cut",
                      "drilldown",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 10,
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "cut",
                        "orig" => "cut",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "drilldown",
                        "orig" => "drilldown",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/cubes/incexp_v2/facts",
                  "parts" => [
                    "cubes",
                    "incexp_v2",
                    "facts",
                  ],
                  "select" => {
                    "exist" => [
                      "cut",
                      "drilldown",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 11,
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "cut",
                        "orig" => "cut",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "drilldown",
                        "orig" => "drilldown",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/cubes/municipalities/facts",
                  "parts" => [
                    "cubes",
                    "municipalities",
                    "facts",
                  ],
                  "select" => {
                    "exist" => [
                      "cut",
                      "drilldown",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 12,
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "cut",
                        "orig" => "cut",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "drilldown",
                        "orig" => "drilldown",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/cubes/officials/facts",
                  "parts" => [
                    "cubes",
                    "officials",
                    "facts",
                  ],
                  "select" => {
                    "exist" => [
                      "cut",
                      "drilldown",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 13,
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "cut",
                        "orig" => "cut",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "drilldown",
                        "orig" => "drilldown",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/cubes/repmaint/facts",
                  "parts" => [
                    "cubes",
                    "repmaint",
                    "facts",
                  ],
                  "select" => {
                    "exist" => [
                      "cut",
                      "drilldown",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 14,
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "cut",
                        "orig" => "cut",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "drilldown",
                        "orig" => "drilldown",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/cubes/repmaint_v2/facts",
                  "parts" => [
                    "cubes",
                    "repmaint_v2",
                    "facts",
                  ],
                  "select" => {
                    "exist" => [
                      "cut",
                      "drilldown",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 15,
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "cut",
                        "orig" => "cut",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                      {
                        "kind" => "query",
                        "name" => "drilldown",
                        "orig" => "drilldown",
                        "reqd" => false,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/cubes/uifwexp/facts",
                  "parts" => [
                    "cubes",
                    "uifwexp",
                    "facts",
                  ],
                  "select" => {
                    "exist" => [
                      "cut",
                      "drilldown",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 16,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    MunicipalFinanceFeatures.make_feature(name)
  end
end

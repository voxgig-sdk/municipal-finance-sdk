-- MunicipalFinance SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "MunicipalFinance",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://municipaldata.treasury.gov.za/api",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["aged_creditor"] = {},
        ["aged_debtor"] = {},
        ["fact"] = {},
      },
    },
    entity = {
      ["aged_creditor"] = {
        ["fields"] = {
          {
            ["name"] = "amount_sum",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "amount_type_code",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "amount_type_label",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "demarcation_code",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "demarcation_label",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "financial_period_period",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "financial_year_end_year",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "item_code",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "item_composition",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "item_label",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "item_position_in_return_form",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "item_return_form_structure",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "period_length_length",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "aged_creditor",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "amount.sum",
                      ["kind"] = "query",
                      ["name"] = "aggregate",
                      ["orig"] = "aggregate",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "financial_year_end.year:2020|demarcation.code:CPT",
                      ["kind"] = "query",
                      ["name"] = "cut",
                      ["orig"] = "cut",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "item.code|financial_period.period",
                      ["kind"] = "query",
                      ["name"] = "drilldown",
                      ["orig"] = "drilldown",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "financial_period.period:asc",
                      ["kind"] = "query",
                      ["name"] = "order",
                      ["orig"] = "order",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = 0,
                      ["kind"] = "query",
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = 10000,
                      ["kind"] = "query",
                      ["name"] = "pagesize",
                      ["orig"] = "pagesize",
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/cubes/aged_creditor/facts",
                ["parts"] = {
                  "cubes",
                  "aged_creditor",
                  "facts",
                },
                ["select"] = {
                  ["$action"] = "fact",
                  ["exist"] = {
                    "aggregate",
                    "cut",
                    "drilldown",
                    "order",
                    "page",
                    "pagesize",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "aggregate",
                      ["orig"] = "aggregate",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "cut",
                      ["orig"] = "cut",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "drilldown",
                      ["orig"] = "drilldown",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "order",
                      ["orig"] = "order",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = 0,
                      ["kind"] = "query",
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = 10000,
                      ["kind"] = "query",
                      ["name"] = "pagesize",
                      ["orig"] = "pagesize",
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/cubes/aged_creditor_v2/facts",
                ["parts"] = {
                  "cubes",
                  "aged_creditor_v2",
                  "facts",
                },
                ["select"] = {
                  ["exist"] = {
                    "aggregate",
                    "cut",
                    "drilldown",
                    "order",
                    "page",
                    "pagesize",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["aged_debtor"] = {
        ["fields"] = {
          {
            ["name"] = "amount_sum",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "amount_type_code",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "amount_type_label",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "customer_group_code",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "demarcation_code",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "demarcation_label",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "financial_period_period",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "financial_year_end_year",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "item_code",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "item_composition",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "item_label",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "item_position_in_return_form",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "item_return_form_structure",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "period_length_length",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "aged_debtor",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "aggregate",
                      ["orig"] = "aggregate",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "financial_year_end.year:2020|customer_group.code:households",
                      ["kind"] = "query",
                      ["name"] = "cut",
                      ["orig"] = "cut",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "item.code|customer_group.code",
                      ["kind"] = "query",
                      ["name"] = "drilldown",
                      ["orig"] = "drilldown",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "order",
                      ["orig"] = "order",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = 0,
                      ["kind"] = "query",
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = 10000,
                      ["kind"] = "query",
                      ["name"] = "pagesize",
                      ["orig"] = "pagesize",
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/cubes/aged_debtor/facts",
                ["parts"] = {
                  "cubes",
                  "aged_debtor",
                  "facts",
                },
                ["select"] = {
                  ["$action"] = "fact",
                  ["exist"] = {
                    "aggregate",
                    "cut",
                    "drilldown",
                    "order",
                    "page",
                    "pagesize",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "aggregate",
                      ["orig"] = "aggregate",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "cut",
                      ["orig"] = "cut",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "drilldown",
                      ["orig"] = "drilldown",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "order",
                      ["orig"] = "order",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = 0,
                      ["kind"] = "query",
                      ["name"] = "page",
                      ["orig"] = "page",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = 10000,
                      ["kind"] = "query",
                      ["name"] = "pagesize",
                      ["orig"] = "pagesize",
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/cubes/aged_debtor_v2/facts",
                ["parts"] = {
                  "cubes",
                  "aged_debtor_v2",
                  "facts",
                },
                ["select"] = {
                  ["exist"] = {
                    "aggregate",
                    "cut",
                    "drilldown",
                    "order",
                    "page",
                    "pagesize",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["fact"] = {
        ["fields"] = {
          {
            ["name"] = "cells",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "summary",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "total_cell_count",
            ["type"] = "`$INTEGER`",
          },
        },
        ["name"] = "fact",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "cut",
                      ["orig"] = "cut",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "drilldown",
                      ["orig"] = "drilldown",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/cubes/audit_opinions/facts",
                ["parts"] = {
                  "cubes",
                  "audit_opinions",
                  "facts",
                },
                ["select"] = {
                  ["exist"] = {
                    "cut",
                    "drilldown",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "cut",
                      ["orig"] = "cut",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "drilldown",
                      ["orig"] = "drilldown",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/cubes/bsheet/facts",
                ["parts"] = {
                  "cubes",
                  "bsheet",
                  "facts",
                },
                ["select"] = {
                  ["exist"] = {
                    "cut",
                    "drilldown",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "cut",
                      ["orig"] = "cut",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "drilldown",
                      ["orig"] = "drilldown",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/cubes/capital/facts",
                ["parts"] = {
                  "cubes",
                  "capital",
                  "facts",
                },
                ["select"] = {
                  ["exist"] = {
                    "cut",
                    "drilldown",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "cut",
                      ["orig"] = "cut",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "drilldown",
                      ["orig"] = "drilldown",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/cubes/capital_v2/facts",
                ["parts"] = {
                  "cubes",
                  "capital_v2",
                  "facts",
                },
                ["select"] = {
                  ["exist"] = {
                    "cut",
                    "drilldown",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "cut",
                      ["orig"] = "cut",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "drilldown",
                      ["orig"] = "drilldown",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/cubes/cflow/facts",
                ["parts"] = {
                  "cubes",
                  "cflow",
                  "facts",
                },
                ["select"] = {
                  ["exist"] = {
                    "cut",
                    "drilldown",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "cut",
                      ["orig"] = "cut",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "drilldown",
                      ["orig"] = "drilldown",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/cubes/cflow_v2/facts",
                ["parts"] = {
                  "cubes",
                  "cflow_v2",
                  "facts",
                },
                ["select"] = {
                  ["exist"] = {
                    "cut",
                    "drilldown",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "cut",
                      ["orig"] = "cut",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "drilldown",
                      ["orig"] = "drilldown",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/cubes/conditional_grants/facts",
                ["parts"] = {
                  "cubes",
                  "conditional_grants",
                  "facts",
                },
                ["select"] = {
                  ["exist"] = {
                    "cut",
                    "drilldown",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "cut",
                      ["orig"] = "cut",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "drilldown",
                      ["orig"] = "drilldown",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/cubes/demarcation_changes/facts",
                ["parts"] = {
                  "cubes",
                  "demarcation_changes",
                  "facts",
                },
                ["select"] = {
                  ["exist"] = {
                    "cut",
                    "drilldown",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "cut",
                      ["orig"] = "cut",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "drilldown",
                      ["orig"] = "drilldown",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/cubes/financial_position_v2/facts",
                ["parts"] = {
                  "cubes",
                  "financial_position_v2",
                  "facts",
                },
                ["select"] = {
                  ["exist"] = {
                    "cut",
                    "drilldown",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "cut",
                      ["orig"] = "cut",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "drilldown",
                      ["orig"] = "drilldown",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/cubes/grants_v2/facts",
                ["parts"] = {
                  "cubes",
                  "grants_v2",
                  "facts",
                },
                ["select"] = {
                  ["exist"] = {
                    "cut",
                    "drilldown",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "cut",
                      ["orig"] = "cut",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "drilldown",
                      ["orig"] = "drilldown",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/cubes/incexp/facts",
                ["parts"] = {
                  "cubes",
                  "incexp",
                  "facts",
                },
                ["select"] = {
                  ["exist"] = {
                    "cut",
                    "drilldown",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "cut",
                      ["orig"] = "cut",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "drilldown",
                      ["orig"] = "drilldown",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/cubes/incexp_v2/facts",
                ["parts"] = {
                  "cubes",
                  "incexp_v2",
                  "facts",
                },
                ["select"] = {
                  ["exist"] = {
                    "cut",
                    "drilldown",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "cut",
                      ["orig"] = "cut",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "drilldown",
                      ["orig"] = "drilldown",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/cubes/municipalities/facts",
                ["parts"] = {
                  "cubes",
                  "municipalities",
                  "facts",
                },
                ["select"] = {
                  ["exist"] = {
                    "cut",
                    "drilldown",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "cut",
                      ["orig"] = "cut",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "drilldown",
                      ["orig"] = "drilldown",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/cubes/officials/facts",
                ["parts"] = {
                  "cubes",
                  "officials",
                  "facts",
                },
                ["select"] = {
                  ["exist"] = {
                    "cut",
                    "drilldown",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "cut",
                      ["orig"] = "cut",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "drilldown",
                      ["orig"] = "drilldown",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/cubes/repmaint/facts",
                ["parts"] = {
                  "cubes",
                  "repmaint",
                  "facts",
                },
                ["select"] = {
                  ["exist"] = {
                    "cut",
                    "drilldown",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "cut",
                      ["orig"] = "cut",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "drilldown",
                      ["orig"] = "drilldown",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/cubes/repmaint_v2/facts",
                ["parts"] = {
                  "cubes",
                  "repmaint_v2",
                  "facts",
                },
                ["select"] = {
                  ["exist"] = {
                    "cut",
                    "drilldown",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "cut",
                      ["orig"] = "cut",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "drilldown",
                      ["orig"] = "drilldown",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/cubes/uifwexp/facts",
                ["parts"] = {
                  "cubes",
                  "uifwexp",
                  "facts",
                },
                ["select"] = {
                  ["exist"] = {
                    "cut",
                    "drilldown",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config

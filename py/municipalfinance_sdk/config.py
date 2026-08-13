# MunicipalFinance SDK configuration


def make_config():
    return {
        "main": {
            "name": "MunicipalFinance",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://municipaldata.treasury.gov.za/api",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "aged_creditor": {},
                "aged_debtor": {},
                "fact": {},
            },
        },
        "entity": {
      "aged_creditor": {
        "fields": [
          {
            "active": True,
            "name": "amount_sum",
            "req": False,
            "type": "`$NUMBER`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "amount_type_code",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "amount_type_label",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "demarcation_code",
            "req": False,
            "type": "`$STRING`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "demarcation_label",
            "req": False,
            "type": "`$STRING`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "financial_period_period",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "financial_year_end_year",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "item_code",
            "req": False,
            "type": "`$STRING`",
            "index$": 7,
          },
          {
            "active": True,
            "name": "item_composition",
            "req": False,
            "type": "`$STRING`",
            "index$": 8,
          },
          {
            "active": True,
            "name": "item_label",
            "req": False,
            "type": "`$STRING`",
            "index$": 9,
          },
          {
            "active": True,
            "name": "item_position_in_return_form",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 10,
          },
          {
            "active": True,
            "name": "item_return_form_structure",
            "req": False,
            "type": "`$STRING`",
            "index$": 11,
          },
          {
            "active": True,
            "name": "period_length_length",
            "req": False,
            "type": "`$STRING`",
            "index$": 12,
          },
        ],
        "name": "aged_creditor",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "example": "amount.sum",
                      "kind": "query",
                      "name": "aggregate",
                      "orig": "aggregate",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "financial_year_end.year:2020|demarcation.code:CPT",
                      "kind": "query",
                      "name": "cut",
                      "orig": "cut",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "item.code|financial_period.period",
                      "kind": "query",
                      "name": "drilldown",
                      "orig": "drilldown",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "financial_period.period:asc",
                      "kind": "query",
                      "name": "order",
                      "orig": "order",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": 0,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                    {
                      "active": True,
                      "example": 10000,
                      "kind": "query",
                      "name": "pagesize",
                      "orig": "pagesize",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/cubes/aged_creditor/facts",
                "parts": [
                  "cubes",
                  "aged_creditor",
                  "facts",
                ],
                "select": {
                  "$action": "fact",
                  "exist": [
                    "aggregate",
                    "cut",
                    "drilldown",
                    "order",
                    "page",
                    "pagesize",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "aggregate",
                      "orig": "aggregate",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "cut",
                      "orig": "cut",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "drilldown",
                      "orig": "drilldown",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "order",
                      "orig": "order",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": 0,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                    {
                      "active": True,
                      "example": 10000,
                      "kind": "query",
                      "name": "pagesize",
                      "orig": "pagesize",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/cubes/aged_creditor_v2/facts",
                "parts": [
                  "cubes",
                  "aged_creditor_v2",
                  "facts",
                ],
                "select": {
                  "exist": [
                    "aggregate",
                    "cut",
                    "drilldown",
                    "order",
                    "page",
                    "pagesize",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 1,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "aged_debtor": {
        "fields": [
          {
            "active": True,
            "name": "amount_sum",
            "req": False,
            "type": "`$NUMBER`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "amount_type_code",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "amount_type_label",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "customer_group_code",
            "req": False,
            "type": "`$STRING`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "demarcation_code",
            "req": False,
            "type": "`$STRING`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "demarcation_label",
            "req": False,
            "type": "`$STRING`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "financial_period_period",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "financial_year_end_year",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 7,
          },
          {
            "active": True,
            "name": "item_code",
            "req": False,
            "type": "`$STRING`",
            "index$": 8,
          },
          {
            "active": True,
            "name": "item_composition",
            "req": False,
            "type": "`$STRING`",
            "index$": 9,
          },
          {
            "active": True,
            "name": "item_label",
            "req": False,
            "type": "`$STRING`",
            "index$": 10,
          },
          {
            "active": True,
            "name": "item_position_in_return_form",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 11,
          },
          {
            "active": True,
            "name": "item_return_form_structure",
            "req": False,
            "type": "`$STRING`",
            "index$": 12,
          },
          {
            "active": True,
            "name": "period_length_length",
            "req": False,
            "type": "`$STRING`",
            "index$": 13,
          },
        ],
        "name": "aged_debtor",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "aggregate",
                      "orig": "aggregate",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "financial_year_end.year:2020|customer_group.code:households",
                      "kind": "query",
                      "name": "cut",
                      "orig": "cut",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": "item.code|customer_group.code",
                      "kind": "query",
                      "name": "drilldown",
                      "orig": "drilldown",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "order",
                      "orig": "order",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": 0,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                    {
                      "active": True,
                      "example": 10000,
                      "kind": "query",
                      "name": "pagesize",
                      "orig": "pagesize",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/cubes/aged_debtor/facts",
                "parts": [
                  "cubes",
                  "aged_debtor",
                  "facts",
                ],
                "select": {
                  "$action": "fact",
                  "exist": [
                    "aggregate",
                    "cut",
                    "drilldown",
                    "order",
                    "page",
                    "pagesize",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "aggregate",
                      "orig": "aggregate",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "cut",
                      "orig": "cut",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "drilldown",
                      "orig": "drilldown",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "order",
                      "orig": "order",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": 0,
                      "kind": "query",
                      "name": "page",
                      "orig": "page",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                    {
                      "active": True,
                      "example": 10000,
                      "kind": "query",
                      "name": "pagesize",
                      "orig": "pagesize",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/cubes/aged_debtor_v2/facts",
                "parts": [
                  "cubes",
                  "aged_debtor_v2",
                  "facts",
                ],
                "select": {
                  "exist": [
                    "aggregate",
                    "cut",
                    "drilldown",
                    "order",
                    "page",
                    "pagesize",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 1,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "fact": {
        "fields": [
          {
            "active": True,
            "name": "cells",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "summary",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "total_cell_count",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 2,
          },
        ],
        "name": "fact",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "cut",
                      "orig": "cut",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "drilldown",
                      "orig": "drilldown",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/cubes/audit_opinions/facts",
                "parts": [
                  "cubes",
                  "audit_opinions",
                  "facts",
                ],
                "select": {
                  "exist": [
                    "cut",
                    "drilldown",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "cut",
                      "orig": "cut",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "drilldown",
                      "orig": "drilldown",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/cubes/bsheet/facts",
                "parts": [
                  "cubes",
                  "bsheet",
                  "facts",
                ],
                "select": {
                  "exist": [
                    "cut",
                    "drilldown",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 1,
              },
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "cut",
                      "orig": "cut",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "drilldown",
                      "orig": "drilldown",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/cubes/capital/facts",
                "parts": [
                  "cubes",
                  "capital",
                  "facts",
                ],
                "select": {
                  "exist": [
                    "cut",
                    "drilldown",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 2,
              },
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "cut",
                      "orig": "cut",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "drilldown",
                      "orig": "drilldown",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/cubes/capital_v2/facts",
                "parts": [
                  "cubes",
                  "capital_v2",
                  "facts",
                ],
                "select": {
                  "exist": [
                    "cut",
                    "drilldown",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 3,
              },
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "cut",
                      "orig": "cut",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "drilldown",
                      "orig": "drilldown",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/cubes/cflow/facts",
                "parts": [
                  "cubes",
                  "cflow",
                  "facts",
                ],
                "select": {
                  "exist": [
                    "cut",
                    "drilldown",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 4,
              },
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "cut",
                      "orig": "cut",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "drilldown",
                      "orig": "drilldown",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/cubes/cflow_v2/facts",
                "parts": [
                  "cubes",
                  "cflow_v2",
                  "facts",
                ],
                "select": {
                  "exist": [
                    "cut",
                    "drilldown",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 5,
              },
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "cut",
                      "orig": "cut",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "drilldown",
                      "orig": "drilldown",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/cubes/conditional_grants/facts",
                "parts": [
                  "cubes",
                  "conditional_grants",
                  "facts",
                ],
                "select": {
                  "exist": [
                    "cut",
                    "drilldown",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 6,
              },
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "cut",
                      "orig": "cut",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "drilldown",
                      "orig": "drilldown",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/cubes/demarcation_changes/facts",
                "parts": [
                  "cubes",
                  "demarcation_changes",
                  "facts",
                ],
                "select": {
                  "exist": [
                    "cut",
                    "drilldown",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 7,
              },
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "cut",
                      "orig": "cut",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "drilldown",
                      "orig": "drilldown",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/cubes/financial_position_v2/facts",
                "parts": [
                  "cubes",
                  "financial_position_v2",
                  "facts",
                ],
                "select": {
                  "exist": [
                    "cut",
                    "drilldown",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 8,
              },
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "cut",
                      "orig": "cut",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "drilldown",
                      "orig": "drilldown",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/cubes/grants_v2/facts",
                "parts": [
                  "cubes",
                  "grants_v2",
                  "facts",
                ],
                "select": {
                  "exist": [
                    "cut",
                    "drilldown",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 9,
              },
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "cut",
                      "orig": "cut",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "drilldown",
                      "orig": "drilldown",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/cubes/incexp/facts",
                "parts": [
                  "cubes",
                  "incexp",
                  "facts",
                ],
                "select": {
                  "exist": [
                    "cut",
                    "drilldown",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 10,
              },
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "cut",
                      "orig": "cut",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "drilldown",
                      "orig": "drilldown",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/cubes/incexp_v2/facts",
                "parts": [
                  "cubes",
                  "incexp_v2",
                  "facts",
                ],
                "select": {
                  "exist": [
                    "cut",
                    "drilldown",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 11,
              },
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "cut",
                      "orig": "cut",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "drilldown",
                      "orig": "drilldown",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/cubes/municipalities/facts",
                "parts": [
                  "cubes",
                  "municipalities",
                  "facts",
                ],
                "select": {
                  "exist": [
                    "cut",
                    "drilldown",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 12,
              },
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "cut",
                      "orig": "cut",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "drilldown",
                      "orig": "drilldown",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/cubes/officials/facts",
                "parts": [
                  "cubes",
                  "officials",
                  "facts",
                ],
                "select": {
                  "exist": [
                    "cut",
                    "drilldown",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 13,
              },
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "cut",
                      "orig": "cut",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "drilldown",
                      "orig": "drilldown",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/cubes/repmaint/facts",
                "parts": [
                  "cubes",
                  "repmaint",
                  "facts",
                ],
                "select": {
                  "exist": [
                    "cut",
                    "drilldown",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 14,
              },
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "cut",
                      "orig": "cut",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "drilldown",
                      "orig": "drilldown",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/cubes/repmaint_v2/facts",
                "parts": [
                  "cubes",
                  "repmaint_v2",
                  "facts",
                ],
                "select": {
                  "exist": [
                    "cut",
                    "drilldown",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 15,
              },
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "cut",
                      "orig": "cut",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "drilldown",
                      "orig": "drilldown",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/cubes/uifwexp/facts",
                "parts": [
                  "cubes",
                  "uifwexp",
                  "facts",
                ],
                "select": {
                  "exist": [
                    "cut",
                    "drilldown",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 16,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }

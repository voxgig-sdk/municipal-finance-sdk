import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "aged_creditor",
    "accessor": "AgedCreditor",
    "op": "list",
    "method": "GET",
    "path": "/cubes/aged_creditor/facts",
    "action": "fact",
    "args": [],
    "select": {
      "aggregate": "amount.sum",
      "cut": "financial_year_end.year:2020|demarcation.code:CPT",
      "drilldown": "item.code|financial_period.period",
      "order": "financial_period.period:asc",
      "page": 0,
      "pagesize": 10000
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "cut",
      "drilldown",
      "aggregates",
      "order",
      "page",
      "pagesize"
    ],
    "queryArgs": [
      {
        "name": "aggregate",
        "wire": "aggregates"
      },
      {
        "name": "cut",
        "wire": "cut"
      },
      {
        "name": "drilldown",
        "wire": "drilldown"
      },
      {
        "name": "order",
        "wire": "order"
      },
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "pagesize",
        "wire": "pagesize"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "total_cell_count": 1,
      "cells": [
        {
          "amount.sum": 1,
          "amount_type.code": "x",
          "amount_type.label": "x",
          "financial_period.period": 1,
          "financial_year_end.year": 1,
          "item.code": "x",
          "item.label": "x",
          "item.composition": "x",
          "item.position_in_return_form": 1,
          "item.return_form_structure": "x",
          "demarcation.code": "x",
          "demarcation.label": "x",
          "period_length.length": "x"
        }
      ],
      "summary": {}
    },
    "idField": "id"
  },
  {
    "entity": "aged_creditor",
    "accessor": "AgedCreditor",
    "op": "list",
    "method": "GET",
    "path": "/cubes/aged_creditor_v2/facts",
    "args": [],
    "select": {
      "aggregate": "v1",
      "cut": "v1",
      "drilldown": "v1",
      "order": "v1",
      "page": 0,
      "pagesize": 10000
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "cut",
      "drilldown",
      "aggregates",
      "order",
      "page",
      "pagesize"
    ],
    "queryArgs": [
      {
        "name": "aggregate",
        "wire": "aggregates"
      },
      {
        "name": "cut",
        "wire": "cut"
      },
      {
        "name": "drilldown",
        "wire": "drilldown"
      },
      {
        "name": "order",
        "wire": "order"
      },
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "pagesize",
        "wire": "pagesize"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "total_cell_count": 1,
      "cells": [
        {
          "amount.sum": 1,
          "amount_type.code": "x",
          "amount_type.label": "x",
          "financial_period.period": 1,
          "financial_year_end.year": 1,
          "item.code": "x",
          "item.label": "x",
          "item.composition": "x",
          "item.position_in_return_form": 1,
          "item.return_form_structure": "x",
          "demarcation.code": "x",
          "demarcation.label": "x",
          "period_length.length": "x"
        }
      ],
      "summary": {}
    },
    "idField": "id"
  },
  {
    "entity": "aged_debtor",
    "accessor": "AgedDebtor",
    "op": "list",
    "method": "GET",
    "path": "/cubes/aged_debtor/facts",
    "action": "fact",
    "args": [],
    "select": {
      "aggregate": "v1",
      "cut": "financial_year_end.year:2020|customer_group.code:households",
      "drilldown": "item.code|customer_group.code",
      "order": "v1",
      "page": 0,
      "pagesize": 10000
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "cut",
      "drilldown",
      "aggregates",
      "order",
      "page",
      "pagesize"
    ],
    "queryArgs": [
      {
        "name": "aggregate",
        "wire": "aggregates"
      },
      {
        "name": "cut",
        "wire": "cut"
      },
      {
        "name": "drilldown",
        "wire": "drilldown"
      },
      {
        "name": "order",
        "wire": "order"
      },
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "pagesize",
        "wire": "pagesize"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "total_cell_count": 1,
      "cells": [
        {
          "amount.sum": 1,
          "amount_type.code": "x",
          "amount_type.label": "x",
          "customer_group.code": "x",
          "financial_period.period": 1,
          "financial_year_end.year": 1,
          "item.code": "x",
          "item.label": "x",
          "item.composition": "x",
          "item.position_in_return_form": 1,
          "item.return_form_structure": "x",
          "demarcation.code": "x",
          "demarcation.label": "x",
          "period_length.length": "x"
        }
      ],
      "summary": {}
    },
    "idField": "id"
  },
  {
    "entity": "aged_debtor",
    "accessor": "AgedDebtor",
    "op": "list",
    "method": "GET",
    "path": "/cubes/aged_debtor_v2/facts",
    "args": [],
    "select": {
      "aggregate": "v1",
      "cut": "v1",
      "drilldown": "v1",
      "order": "v1",
      "page": 0,
      "pagesize": 10000
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "cut",
      "drilldown",
      "aggregates",
      "order",
      "page",
      "pagesize"
    ],
    "queryArgs": [
      {
        "name": "aggregate",
        "wire": "aggregates"
      },
      {
        "name": "cut",
        "wire": "cut"
      },
      {
        "name": "drilldown",
        "wire": "drilldown"
      },
      {
        "name": "order",
        "wire": "order"
      },
      {
        "name": "page",
        "wire": "page"
      },
      {
        "name": "pagesize",
        "wire": "pagesize"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "total_cell_count": 1,
      "cells": [
        {
          "amount.sum": 1,
          "amount_type.code": "x",
          "amount_type.label": "x",
          "customer_group.code": "x",
          "financial_period.period": 1,
          "financial_year_end.year": 1,
          "item.code": "x",
          "item.label": "x",
          "item.composition": "x",
          "item.position_in_return_form": 1,
          "item.return_form_structure": "x",
          "demarcation.code": "x",
          "demarcation.label": "x",
          "period_length.length": "x"
        }
      ],
      "summary": {}
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})

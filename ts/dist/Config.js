"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'MunicipalFinance',
        slug: "municipal-finance",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://municipaldata.treasury.gov.za/api",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            aged_creditor: {},
            aged_debtor: {},
            fact: {},
        }
    };
    entity = {
        "aged_creditor": {
            "fields": [
                {
                    "name": "amount_sum",
                    "title": "Amount Sum",
                    "type": "`$NUMBER`",
                    "short": "Sum of the amount"
                },
                {
                    "name": "amount_type_code",
                    "title": "Amount Type Code",
                    "type": "`$STRING`",
                    "short": "Amount type code"
                },
                {
                    "name": "amount_type_label",
                    "title": "Amount Type Label",
                    "type": "`$STRING`",
                    "short": "Amount type label"
                },
                {
                    "name": "demarcation_code",
                    "title": "Demarcation Code",
                    "type": "`$STRING`",
                    "short": "Municipality demarcation code"
                },
                {
                    "name": "demarcation_label",
                    "title": "Demarcation Label",
                    "type": "`$STRING`",
                    "short": "Municipality name"
                },
                {
                    "name": "financial_period_period",
                    "title": "Financial Period Period",
                    "type": "`$INTEGER`",
                    "short": "Financial period number"
                },
                {
                    "name": "financial_year_end_year",
                    "title": "Financial Year End Year",
                    "type": "`$INTEGER`",
                    "short": "Financial year end"
                },
                {
                    "name": "item_code",
                    "title": "Item Code",
                    "type": "`$STRING`",
                    "short": "Item code"
                },
                {
                    "name": "item_composition",
                    "title": "Item Composition",
                    "type": "`$STRING`",
                    "short": "Item composition formula"
                },
                {
                    "name": "item_label",
                    "title": "Item Label",
                    "type": "`$STRING`",
                    "short": "Item label"
                },
                {
                    "name": "item_position_in_return_form",
                    "title": "Item Position In Return Form",
                    "type": "`$INTEGER`",
                    "short": "Position in return form"
                },
                {
                    "name": "item_return_form_structure",
                    "title": "Item Return Form Structure",
                    "type": "`$STRING`",
                    "short": "Return form structure"
                },
                {
                    "name": "period_length_length",
                    "title": "Period Length Length",
                    "type": "`$STRING`",
                    "short": "Period length"
                }
            ],
            "name": "aged_creditor",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/cubes/aged_creditor/facts",
                            "segments": [
                                {
                                    "lit": "cubes"
                                },
                                {
                                    "lit": "aged_creditor"
                                },
                                {
                                    "lit": "facts"
                                }
                            ],
                            "parts": [
                                "cubes",
                                "aged_creditor",
                                "facts"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "aggregate",
                                        "orig": "aggregate",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "amount.sum"
                                    },
                                    {
                                        "name": "cut",
                                        "orig": "cut",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "financial_year_end.year:2020|demarcation.code:CPT"
                                    },
                                    {
                                        "name": "drilldown",
                                        "orig": "drilldown",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "item.code|financial_period.period"
                                    },
                                    {
                                        "name": "order",
                                        "orig": "order",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "financial_period.period:asc"
                                    },
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 0
                                    },
                                    {
                                        "name": "pagesize",
                                        "orig": "pagesize",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 10000
                                    }
                                ]
                            },
                            "select": {
                                "$action": "fact",
                                "exist": [
                                    "aggregate",
                                    "cut",
                                    "drilldown",
                                    "order",
                                    "page",
                                    "pagesize"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/cubes/aged_creditor_v2/facts",
                            "segments": [
                                {
                                    "lit": "cubes"
                                },
                                {
                                    "lit": "aged_creditor_v2"
                                },
                                {
                                    "lit": "facts"
                                }
                            ],
                            "parts": [
                                "cubes",
                                "aged_creditor_v2",
                                "facts"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "aggregate",
                                        "orig": "aggregate",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "cut",
                                        "orig": "cut",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "drilldown",
                                        "orig": "drilldown",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "order",
                                        "orig": "order",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 0
                                    },
                                    {
                                        "name": "pagesize",
                                        "orig": "pagesize",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 10000
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "aggregate",
                                    "cut",
                                    "drilldown",
                                    "order",
                                    "page",
                                    "pagesize"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "aged_debtor": {
            "fields": [
                {
                    "name": "amount_sum",
                    "title": "Amount Sum",
                    "type": "`$NUMBER`",
                    "short": "Sum of the amount"
                },
                {
                    "name": "amount_type_code",
                    "title": "Amount Type Code",
                    "type": "`$STRING`",
                    "short": "Amount type code"
                },
                {
                    "name": "amount_type_label",
                    "title": "Amount Type Label",
                    "type": "`$STRING`",
                    "short": "Amount type label"
                },
                {
                    "name": "customer_group_code",
                    "title": "Customer Group Code",
                    "type": "`$STRING`",
                    "short": "Customer group code"
                },
                {
                    "name": "demarcation_code",
                    "title": "Demarcation Code",
                    "type": "`$STRING`",
                    "short": "Municipality demarcation code"
                },
                {
                    "name": "demarcation_label",
                    "title": "Demarcation Label",
                    "type": "`$STRING`",
                    "short": "Municipality name"
                },
                {
                    "name": "financial_period_period",
                    "title": "Financial Period Period",
                    "type": "`$INTEGER`",
                    "short": "Financial period number"
                },
                {
                    "name": "financial_year_end_year",
                    "title": "Financial Year End Year",
                    "type": "`$INTEGER`",
                    "short": "Financial year end"
                },
                {
                    "name": "item_code",
                    "title": "Item Code",
                    "type": "`$STRING`",
                    "short": "Item code"
                },
                {
                    "name": "item_composition",
                    "title": "Item Composition",
                    "type": "`$STRING`",
                    "short": "Item composition formula"
                },
                {
                    "name": "item_label",
                    "title": "Item Label",
                    "type": "`$STRING`",
                    "short": "Item label"
                },
                {
                    "name": "item_position_in_return_form",
                    "title": "Item Position In Return Form",
                    "type": "`$INTEGER`",
                    "short": "Position in return form"
                },
                {
                    "name": "item_return_form_structure",
                    "title": "Item Return Form Structure",
                    "type": "`$STRING`",
                    "short": "Return form structure"
                },
                {
                    "name": "period_length_length",
                    "title": "Period Length Length",
                    "type": "`$STRING`",
                    "short": "Period length"
                }
            ],
            "name": "aged_debtor",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/cubes/aged_debtor/facts",
                            "segments": [
                                {
                                    "lit": "cubes"
                                },
                                {
                                    "lit": "aged_debtor"
                                },
                                {
                                    "lit": "facts"
                                }
                            ],
                            "parts": [
                                "cubes",
                                "aged_debtor",
                                "facts"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "aggregate",
                                        "orig": "aggregate",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "cut",
                                        "orig": "cut",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "financial_year_end.year:2020|customer_group.code:households"
                                    },
                                    {
                                        "name": "drilldown",
                                        "orig": "drilldown",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "item.code|customer_group.code"
                                    },
                                    {
                                        "name": "order",
                                        "orig": "order",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 0
                                    },
                                    {
                                        "name": "pagesize",
                                        "orig": "pagesize",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 10000
                                    }
                                ]
                            },
                            "select": {
                                "$action": "fact",
                                "exist": [
                                    "aggregate",
                                    "cut",
                                    "drilldown",
                                    "order",
                                    "page",
                                    "pagesize"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/cubes/aged_debtor_v2/facts",
                            "segments": [
                                {
                                    "lit": "cubes"
                                },
                                {
                                    "lit": "aged_debtor_v2"
                                },
                                {
                                    "lit": "facts"
                                }
                            ],
                            "parts": [
                                "cubes",
                                "aged_debtor_v2",
                                "facts"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "aggregate",
                                        "orig": "aggregate",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "cut",
                                        "orig": "cut",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "drilldown",
                                        "orig": "drilldown",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "order",
                                        "orig": "order",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "page",
                                        "orig": "page",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 0
                                    },
                                    {
                                        "name": "pagesize",
                                        "orig": "pagesize",
                                        "type": "`$INTEGER`",
                                        "kind": "query",
                                        "example": 10000
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "aggregate",
                                    "cut",
                                    "drilldown",
                                    "order",
                                    "page",
                                    "pagesize"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "fact": {
            "fields": [
                {
                    "name": "cells",
                    "title": "Cells",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "summary",
                    "title": "Summary",
                    "type": "`$OBJECT`"
                },
                {
                    "name": "total_cell_count",
                    "title": "Total Cell Count",
                    "type": "`$INTEGER`",
                    "short": "Total number of cells in the result"
                }
            ],
            "name": "fact",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/cubes/audit_opinions/facts",
                            "segments": [
                                {
                                    "lit": "cubes"
                                },
                                {
                                    "lit": "audit_opinions"
                                },
                                {
                                    "lit": "facts"
                                }
                            ],
                            "parts": [
                                "cubes",
                                "audit_opinions",
                                "facts"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "cut",
                                        "orig": "cut",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "drilldown",
                                        "orig": "drilldown",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "cut",
                                    "drilldown"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/cubes/bsheet/facts",
                            "segments": [
                                {
                                    "lit": "cubes"
                                },
                                {
                                    "lit": "bsheet"
                                },
                                {
                                    "lit": "facts"
                                }
                            ],
                            "parts": [
                                "cubes",
                                "bsheet",
                                "facts"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "cut",
                                        "orig": "cut",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "drilldown",
                                        "orig": "drilldown",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "cut",
                                    "drilldown"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/cubes/capital/facts",
                            "segments": [
                                {
                                    "lit": "cubes"
                                },
                                {
                                    "lit": "capital"
                                },
                                {
                                    "lit": "facts"
                                }
                            ],
                            "parts": [
                                "cubes",
                                "capital",
                                "facts"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "cut",
                                        "orig": "cut",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "drilldown",
                                        "orig": "drilldown",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "cut",
                                    "drilldown"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/cubes/capital_v2/facts",
                            "segments": [
                                {
                                    "lit": "cubes"
                                },
                                {
                                    "lit": "capital_v2"
                                },
                                {
                                    "lit": "facts"
                                }
                            ],
                            "parts": [
                                "cubes",
                                "capital_v2",
                                "facts"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "cut",
                                        "orig": "cut",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "drilldown",
                                        "orig": "drilldown",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "cut",
                                    "drilldown"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/cubes/cflow/facts",
                            "segments": [
                                {
                                    "lit": "cubes"
                                },
                                {
                                    "lit": "cflow"
                                },
                                {
                                    "lit": "facts"
                                }
                            ],
                            "parts": [
                                "cubes",
                                "cflow",
                                "facts"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "cut",
                                        "orig": "cut",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "drilldown",
                                        "orig": "drilldown",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "cut",
                                    "drilldown"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/cubes/cflow_v2/facts",
                            "segments": [
                                {
                                    "lit": "cubes"
                                },
                                {
                                    "lit": "cflow_v2"
                                },
                                {
                                    "lit": "facts"
                                }
                            ],
                            "parts": [
                                "cubes",
                                "cflow_v2",
                                "facts"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "cut",
                                        "orig": "cut",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "drilldown",
                                        "orig": "drilldown",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "cut",
                                    "drilldown"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/cubes/conditional_grants/facts",
                            "segments": [
                                {
                                    "lit": "cubes"
                                },
                                {
                                    "lit": "conditional_grants"
                                },
                                {
                                    "lit": "facts"
                                }
                            ],
                            "parts": [
                                "cubes",
                                "conditional_grants",
                                "facts"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "cut",
                                        "orig": "cut",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "drilldown",
                                        "orig": "drilldown",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "cut",
                                    "drilldown"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/cubes/demarcation_changes/facts",
                            "segments": [
                                {
                                    "lit": "cubes"
                                },
                                {
                                    "lit": "demarcation_changes"
                                },
                                {
                                    "lit": "facts"
                                }
                            ],
                            "parts": [
                                "cubes",
                                "demarcation_changes",
                                "facts"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "cut",
                                        "orig": "cut",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "drilldown",
                                        "orig": "drilldown",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "cut",
                                    "drilldown"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/cubes/financial_position_v2/facts",
                            "segments": [
                                {
                                    "lit": "cubes"
                                },
                                {
                                    "lit": "financial_position_v2"
                                },
                                {
                                    "lit": "facts"
                                }
                            ],
                            "parts": [
                                "cubes",
                                "financial_position_v2",
                                "facts"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "cut",
                                        "orig": "cut",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "drilldown",
                                        "orig": "drilldown",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "cut",
                                    "drilldown"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/cubes/grants_v2/facts",
                            "segments": [
                                {
                                    "lit": "cubes"
                                },
                                {
                                    "lit": "grants_v2"
                                },
                                {
                                    "lit": "facts"
                                }
                            ],
                            "parts": [
                                "cubes",
                                "grants_v2",
                                "facts"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "cut",
                                        "orig": "cut",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "drilldown",
                                        "orig": "drilldown",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "cut",
                                    "drilldown"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/cubes/incexp/facts",
                            "segments": [
                                {
                                    "lit": "cubes"
                                },
                                {
                                    "lit": "incexp"
                                },
                                {
                                    "lit": "facts"
                                }
                            ],
                            "parts": [
                                "cubes",
                                "incexp",
                                "facts"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "cut",
                                        "orig": "cut",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "drilldown",
                                        "orig": "drilldown",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "cut",
                                    "drilldown"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/cubes/incexp_v2/facts",
                            "segments": [
                                {
                                    "lit": "cubes"
                                },
                                {
                                    "lit": "incexp_v2"
                                },
                                {
                                    "lit": "facts"
                                }
                            ],
                            "parts": [
                                "cubes",
                                "incexp_v2",
                                "facts"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "cut",
                                        "orig": "cut",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "drilldown",
                                        "orig": "drilldown",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "cut",
                                    "drilldown"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/cubes/municipalities/facts",
                            "segments": [
                                {
                                    "lit": "cubes"
                                },
                                {
                                    "lit": "municipalities"
                                },
                                {
                                    "lit": "facts"
                                }
                            ],
                            "parts": [
                                "cubes",
                                "municipalities",
                                "facts"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "cut",
                                        "orig": "cut",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "drilldown",
                                        "orig": "drilldown",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "cut",
                                    "drilldown"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/cubes/officials/facts",
                            "segments": [
                                {
                                    "lit": "cubes"
                                },
                                {
                                    "lit": "officials"
                                },
                                {
                                    "lit": "facts"
                                }
                            ],
                            "parts": [
                                "cubes",
                                "officials",
                                "facts"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "cut",
                                        "orig": "cut",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "drilldown",
                                        "orig": "drilldown",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "cut",
                                    "drilldown"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/cubes/repmaint/facts",
                            "segments": [
                                {
                                    "lit": "cubes"
                                },
                                {
                                    "lit": "repmaint"
                                },
                                {
                                    "lit": "facts"
                                }
                            ],
                            "parts": [
                                "cubes",
                                "repmaint",
                                "facts"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "cut",
                                        "orig": "cut",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "drilldown",
                                        "orig": "drilldown",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "cut",
                                    "drilldown"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/cubes/repmaint_v2/facts",
                            "segments": [
                                {
                                    "lit": "cubes"
                                },
                                {
                                    "lit": "repmaint_v2"
                                },
                                {
                                    "lit": "facts"
                                }
                            ],
                            "parts": [
                                "cubes",
                                "repmaint_v2",
                                "facts"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "cut",
                                        "orig": "cut",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "drilldown",
                                        "orig": "drilldown",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "cut",
                                    "drilldown"
                                ]
                            }
                        },
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/cubes/uifwexp/facts",
                            "segments": [
                                {
                                    "lit": "cubes"
                                },
                                {
                                    "lit": "uifwexp"
                                },
                                {
                                    "lit": "facts"
                                }
                            ],
                            "parts": [
                                "cubes",
                                "uifwexp",
                                "facts"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "query": [
                                    {
                                        "name": "cut",
                                        "orig": "cut",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    },
                                    {
                                        "name": "drilldown",
                                        "orig": "drilldown",
                                        "type": "`$STRING`",
                                        "kind": "query"
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "cut",
                                    "drilldown"
                                ]
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map
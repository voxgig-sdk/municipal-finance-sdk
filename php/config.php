<?php
declare(strict_types=1);

// MunicipalFinance SDK configuration

class MunicipalFinanceConfig
{
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "MunicipalFinance",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://municipaldata.treasury.gov.za/api",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "aged_creditor" => [],
                    "aged_debtor" => [],
                    "fact" => [],
                ],
            ],
            "entity" => [
        'aged_creditor' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'amount_sum',
              'req' => false,
              'type' => '`$NUMBER`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'amount_type_code',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'amount_type_label',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'demarcation_code',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'demarcation_label',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 4,
            ],
            [
              'active' => true,
              'name' => 'financial_period_period',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 5,
            ],
            [
              'active' => true,
              'name' => 'financial_year_end_year',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 6,
            ],
            [
              'active' => true,
              'name' => 'item_code',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 7,
            ],
            [
              'active' => true,
              'name' => 'item_composition',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 8,
            ],
            [
              'active' => true,
              'name' => 'item_label',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 9,
            ],
            [
              'active' => true,
              'name' => 'item_position_in_return_form',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 10,
            ],
            [
              'active' => true,
              'name' => 'item_return_form_structure',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 11,
            ],
            [
              'active' => true,
              'name' => 'period_length_length',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 12,
            ],
          ],
          'name' => 'aged_creditor',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'example' => 'amount.sum',
                        'kind' => 'query',
                        'name' => 'aggregate',
                        'orig' => 'aggregate',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => 'financial_year_end.year:2020|demarcation.code:CPT',
                        'kind' => 'query',
                        'name' => 'cut',
                        'orig' => 'cut',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => 'item.code|financial_period.period',
                        'kind' => 'query',
                        'name' => 'drilldown',
                        'orig' => 'drilldown',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => 'financial_period.period:asc',
                        'kind' => 'query',
                        'name' => 'order',
                        'orig' => 'order',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => 0,
                        'kind' => 'query',
                        'name' => 'page',
                        'orig' => 'page',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'active' => true,
                        'example' => 10000,
                        'kind' => 'query',
                        'name' => 'pagesize',
                        'orig' => 'pagesize',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/cubes/aged_creditor/facts',
                  'parts' => [
                    'cubes',
                    'aged_creditor',
                    'facts',
                  ],
                  'select' => [
                    '$action' => 'fact',
                    'exist' => [
                      'aggregate',
                      'cut',
                      'drilldown',
                      'order',
                      'page',
                      'pagesize',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'aggregate',
                        'orig' => 'aggregate',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'cut',
                        'orig' => 'cut',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'drilldown',
                        'orig' => 'drilldown',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'order',
                        'orig' => 'order',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => 0,
                        'kind' => 'query',
                        'name' => 'page',
                        'orig' => 'page',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'active' => true,
                        'example' => 10000,
                        'kind' => 'query',
                        'name' => 'pagesize',
                        'orig' => 'pagesize',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/cubes/aged_creditor_v2/facts',
                  'parts' => [
                    'cubes',
                    'aged_creditor_v2',
                    'facts',
                  ],
                  'select' => [
                    'exist' => [
                      'aggregate',
                      'cut',
                      'drilldown',
                      'order',
                      'page',
                      'pagesize',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 1,
                ],
              ],
              'key$' => 'list',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'aged_debtor' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'amount_sum',
              'req' => false,
              'type' => '`$NUMBER`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'amount_type_code',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'amount_type_label',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 2,
            ],
            [
              'active' => true,
              'name' => 'customer_group_code',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 3,
            ],
            [
              'active' => true,
              'name' => 'demarcation_code',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 4,
            ],
            [
              'active' => true,
              'name' => 'demarcation_label',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 5,
            ],
            [
              'active' => true,
              'name' => 'financial_period_period',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 6,
            ],
            [
              'active' => true,
              'name' => 'financial_year_end_year',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 7,
            ],
            [
              'active' => true,
              'name' => 'item_code',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 8,
            ],
            [
              'active' => true,
              'name' => 'item_composition',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 9,
            ],
            [
              'active' => true,
              'name' => 'item_label',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 10,
            ],
            [
              'active' => true,
              'name' => 'item_position_in_return_form',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 11,
            ],
            [
              'active' => true,
              'name' => 'item_return_form_structure',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 12,
            ],
            [
              'active' => true,
              'name' => 'period_length_length',
              'req' => false,
              'type' => '`$STRING`',
              'index$' => 13,
            ],
          ],
          'name' => 'aged_debtor',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'aggregate',
                        'orig' => 'aggregate',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => 'financial_year_end.year:2020|customer_group.code:households',
                        'kind' => 'query',
                        'name' => 'cut',
                        'orig' => 'cut',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => 'item.code|customer_group.code',
                        'kind' => 'query',
                        'name' => 'drilldown',
                        'orig' => 'drilldown',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'order',
                        'orig' => 'order',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => 0,
                        'kind' => 'query',
                        'name' => 'page',
                        'orig' => 'page',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'active' => true,
                        'example' => 10000,
                        'kind' => 'query',
                        'name' => 'pagesize',
                        'orig' => 'pagesize',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/cubes/aged_debtor/facts',
                  'parts' => [
                    'cubes',
                    'aged_debtor',
                    'facts',
                  ],
                  'select' => [
                    '$action' => 'fact',
                    'exist' => [
                      'aggregate',
                      'cut',
                      'drilldown',
                      'order',
                      'page',
                      'pagesize',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'aggregate',
                        'orig' => 'aggregate',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'cut',
                        'orig' => 'cut',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'drilldown',
                        'orig' => 'drilldown',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'order',
                        'orig' => 'order',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'example' => 0,
                        'kind' => 'query',
                        'name' => 'page',
                        'orig' => 'page',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'active' => true,
                        'example' => 10000,
                        'kind' => 'query',
                        'name' => 'pagesize',
                        'orig' => 'pagesize',
                        'reqd' => false,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/cubes/aged_debtor_v2/facts',
                  'parts' => [
                    'cubes',
                    'aged_debtor_v2',
                    'facts',
                  ],
                  'select' => [
                    'exist' => [
                      'aggregate',
                      'cut',
                      'drilldown',
                      'order',
                      'page',
                      'pagesize',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 1,
                ],
              ],
              'key$' => 'list',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'fact' => [
          'fields' => [
            [
              'active' => true,
              'name' => 'cells',
              'req' => false,
              'type' => '`$ARRAY`',
              'index$' => 0,
            ],
            [
              'active' => true,
              'name' => 'summary',
              'req' => false,
              'type' => '`$OBJECT`',
              'index$' => 1,
            ],
            [
              'active' => true,
              'name' => 'total_cell_count',
              'req' => false,
              'type' => '`$INTEGER`',
              'index$' => 2,
            ],
          ],
          'name' => 'fact',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'cut',
                        'orig' => 'cut',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'drilldown',
                        'orig' => 'drilldown',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/cubes/audit_opinions/facts',
                  'parts' => [
                    'cubes',
                    'audit_opinions',
                    'facts',
                  ],
                  'select' => [
                    'exist' => [
                      'cut',
                      'drilldown',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 0,
                ],
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'cut',
                        'orig' => 'cut',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'drilldown',
                        'orig' => 'drilldown',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/cubes/bsheet/facts',
                  'parts' => [
                    'cubes',
                    'bsheet',
                    'facts',
                  ],
                  'select' => [
                    'exist' => [
                      'cut',
                      'drilldown',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 1,
                ],
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'cut',
                        'orig' => 'cut',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'drilldown',
                        'orig' => 'drilldown',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/cubes/capital/facts',
                  'parts' => [
                    'cubes',
                    'capital',
                    'facts',
                  ],
                  'select' => [
                    'exist' => [
                      'cut',
                      'drilldown',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 2,
                ],
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'cut',
                        'orig' => 'cut',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'drilldown',
                        'orig' => 'drilldown',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/cubes/capital_v2/facts',
                  'parts' => [
                    'cubes',
                    'capital_v2',
                    'facts',
                  ],
                  'select' => [
                    'exist' => [
                      'cut',
                      'drilldown',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 3,
                ],
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'cut',
                        'orig' => 'cut',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'drilldown',
                        'orig' => 'drilldown',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/cubes/cflow/facts',
                  'parts' => [
                    'cubes',
                    'cflow',
                    'facts',
                  ],
                  'select' => [
                    'exist' => [
                      'cut',
                      'drilldown',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 4,
                ],
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'cut',
                        'orig' => 'cut',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'drilldown',
                        'orig' => 'drilldown',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/cubes/cflow_v2/facts',
                  'parts' => [
                    'cubes',
                    'cflow_v2',
                    'facts',
                  ],
                  'select' => [
                    'exist' => [
                      'cut',
                      'drilldown',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 5,
                ],
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'cut',
                        'orig' => 'cut',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'drilldown',
                        'orig' => 'drilldown',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/cubes/conditional_grants/facts',
                  'parts' => [
                    'cubes',
                    'conditional_grants',
                    'facts',
                  ],
                  'select' => [
                    'exist' => [
                      'cut',
                      'drilldown',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 6,
                ],
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'cut',
                        'orig' => 'cut',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'drilldown',
                        'orig' => 'drilldown',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/cubes/demarcation_changes/facts',
                  'parts' => [
                    'cubes',
                    'demarcation_changes',
                    'facts',
                  ],
                  'select' => [
                    'exist' => [
                      'cut',
                      'drilldown',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 7,
                ],
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'cut',
                        'orig' => 'cut',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'drilldown',
                        'orig' => 'drilldown',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/cubes/financial_position_v2/facts',
                  'parts' => [
                    'cubes',
                    'financial_position_v2',
                    'facts',
                  ],
                  'select' => [
                    'exist' => [
                      'cut',
                      'drilldown',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 8,
                ],
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'cut',
                        'orig' => 'cut',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'drilldown',
                        'orig' => 'drilldown',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/cubes/grants_v2/facts',
                  'parts' => [
                    'cubes',
                    'grants_v2',
                    'facts',
                  ],
                  'select' => [
                    'exist' => [
                      'cut',
                      'drilldown',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 9,
                ],
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'cut',
                        'orig' => 'cut',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'drilldown',
                        'orig' => 'drilldown',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/cubes/incexp/facts',
                  'parts' => [
                    'cubes',
                    'incexp',
                    'facts',
                  ],
                  'select' => [
                    'exist' => [
                      'cut',
                      'drilldown',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 10,
                ],
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'cut',
                        'orig' => 'cut',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'drilldown',
                        'orig' => 'drilldown',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/cubes/incexp_v2/facts',
                  'parts' => [
                    'cubes',
                    'incexp_v2',
                    'facts',
                  ],
                  'select' => [
                    'exist' => [
                      'cut',
                      'drilldown',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 11,
                ],
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'cut',
                        'orig' => 'cut',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'drilldown',
                        'orig' => 'drilldown',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/cubes/municipalities/facts',
                  'parts' => [
                    'cubes',
                    'municipalities',
                    'facts',
                  ],
                  'select' => [
                    'exist' => [
                      'cut',
                      'drilldown',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 12,
                ],
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'cut',
                        'orig' => 'cut',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'drilldown',
                        'orig' => 'drilldown',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/cubes/officials/facts',
                  'parts' => [
                    'cubes',
                    'officials',
                    'facts',
                  ],
                  'select' => [
                    'exist' => [
                      'cut',
                      'drilldown',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 13,
                ],
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'cut',
                        'orig' => 'cut',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'drilldown',
                        'orig' => 'drilldown',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/cubes/repmaint/facts',
                  'parts' => [
                    'cubes',
                    'repmaint',
                    'facts',
                  ],
                  'select' => [
                    'exist' => [
                      'cut',
                      'drilldown',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 14,
                ],
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'cut',
                        'orig' => 'cut',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'drilldown',
                        'orig' => 'drilldown',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/cubes/repmaint_v2/facts',
                  'parts' => [
                    'cubes',
                    'repmaint_v2',
                    'facts',
                  ],
                  'select' => [
                    'exist' => [
                      'cut',
                      'drilldown',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 15,
                ],
                [
                  'active' => true,
                  'args' => [
                    'query' => [
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'cut',
                        'orig' => 'cut',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                      [
                        'active' => true,
                        'kind' => 'query',
                        'name' => 'drilldown',
                        'orig' => 'drilldown',
                        'reqd' => false,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/cubes/uifwexp/facts',
                  'parts' => [
                    'cubes',
                    'uifwexp',
                    'facts',
                  ],
                  'select' => [
                    'exist' => [
                      'cut',
                      'drilldown',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'index$' => 16,
                ],
              ],
              'key$' => 'list',
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return MunicipalFinanceFeatures::make_feature($name);
    }
}

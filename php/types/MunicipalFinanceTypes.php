<?php
declare(strict_types=1);

// Typed models for the MunicipalFinance SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** AgedCreditor entity data model. */
class AgedCreditor
{
    public ?float $amount_sum = null;
    public ?string $amount_type_code = null;
    public ?string $amount_type_label = null;
    public ?string $demarcation_code = null;
    public ?string $demarcation_label = null;
    public ?int $financial_period_period = null;
    public ?int $financial_year_end_year = null;
    public ?string $item_code = null;
    public ?string $item_composition = null;
    public ?string $item_label = null;
    public ?int $item_position_in_return_form = null;
    public ?string $item_return_form_structure = null;
    public ?string $period_length_length = null;
}

/** Match filter for AgedCreditor#list (any subset of AgedCreditor fields). */
class AgedCreditorListMatch
{
    public ?float $amount_sum = null;
    public ?string $amount_type_code = null;
    public ?string $amount_type_label = null;
    public ?string $demarcation_code = null;
    public ?string $demarcation_label = null;
    public ?int $financial_period_period = null;
    public ?int $financial_year_end_year = null;
    public ?string $item_code = null;
    public ?string $item_composition = null;
    public ?string $item_label = null;
    public ?int $item_position_in_return_form = null;
    public ?string $item_return_form_structure = null;
    public ?string $period_length_length = null;
}

/** AgedDebtor entity data model. */
class AgedDebtor
{
    public ?float $amount_sum = null;
    public ?string $amount_type_code = null;
    public ?string $amount_type_label = null;
    public ?string $customer_group_code = null;
    public ?string $demarcation_code = null;
    public ?string $demarcation_label = null;
    public ?int $financial_period_period = null;
    public ?int $financial_year_end_year = null;
    public ?string $item_code = null;
    public ?string $item_composition = null;
    public ?string $item_label = null;
    public ?int $item_position_in_return_form = null;
    public ?string $item_return_form_structure = null;
    public ?string $period_length_length = null;
}

/** Match filter for AgedDebtor#list (any subset of AgedDebtor fields). */
class AgedDebtorListMatch
{
    public ?float $amount_sum = null;
    public ?string $amount_type_code = null;
    public ?string $amount_type_label = null;
    public ?string $customer_group_code = null;
    public ?string $demarcation_code = null;
    public ?string $demarcation_label = null;
    public ?int $financial_period_period = null;
    public ?int $financial_year_end_year = null;
    public ?string $item_code = null;
    public ?string $item_composition = null;
    public ?string $item_label = null;
    public ?int $item_position_in_return_form = null;
    public ?string $item_return_form_structure = null;
    public ?string $period_length_length = null;
}

/** Fact entity data model. */
class Fact
{
    public ?array $cell = null;
    public ?array $summary = null;
    public ?int $total_cell_count = null;
}

/** Match filter for Fact#list (any subset of Fact fields). */
class FactListMatch
{
    public ?array $cell = null;
    public ?array $summary = null;
    public ?int $total_cell_count = null;
}


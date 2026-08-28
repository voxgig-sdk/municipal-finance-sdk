# Typed models for the MunicipalFinance SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class AgedCreditor(TypedDict, total=False):
    amount_sum: float
    amount_type_code: str
    amount_type_label: str
    demarcation_code: str
    demarcation_label: str
    financial_period_period: int
    financial_year_end_year: int
    item_code: str
    item_composition: str
    item_label: str
    item_position_in_return_form: int
    item_return_form_structure: str
    period_length_length: str


class AgedCreditorListMatch(TypedDict, total=False):
    aggregate: str
    cut: str
    drilldown: str
    order: str
    page: int
    pagesize: int


class AgedDebtor(TypedDict, total=False):
    amount_sum: float
    amount_type_code: str
    amount_type_label: str
    customer_group_code: str
    demarcation_code: str
    demarcation_label: str
    financial_period_period: int
    financial_year_end_year: int
    item_code: str
    item_composition: str
    item_label: str
    item_position_in_return_form: int
    item_return_form_structure: str
    period_length_length: str


class AgedDebtorListMatch(TypedDict, total=False):
    aggregate: str
    cut: str
    drilldown: str
    order: str
    page: int
    pagesize: int


class Fact(TypedDict, total=False):
    cells: list
    summary: dict
    total_cell_count: int


class FactListMatch(TypedDict, total=False):
    cut: str
    drilldown: str

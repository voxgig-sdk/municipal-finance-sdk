# Typed models for the MunicipalFinance SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class AgedCreditor:
    amount_sum: Optional[float] = None
    amount_type_code: Optional[str] = None
    amount_type_label: Optional[str] = None
    demarcation_code: Optional[str] = None
    demarcation_label: Optional[str] = None
    financial_period_period: Optional[int] = None
    financial_year_end_year: Optional[int] = None
    item_code: Optional[str] = None
    item_composition: Optional[str] = None
    item_label: Optional[str] = None
    item_position_in_return_form: Optional[int] = None
    item_return_form_structure: Optional[str] = None
    period_length_length: Optional[str] = None


@dataclass
class AgedCreditorListMatch:
    amount_sum: Optional[float] = None
    amount_type_code: Optional[str] = None
    amount_type_label: Optional[str] = None
    demarcation_code: Optional[str] = None
    demarcation_label: Optional[str] = None
    financial_period_period: Optional[int] = None
    financial_year_end_year: Optional[int] = None
    item_code: Optional[str] = None
    item_composition: Optional[str] = None
    item_label: Optional[str] = None
    item_position_in_return_form: Optional[int] = None
    item_return_form_structure: Optional[str] = None
    period_length_length: Optional[str] = None


@dataclass
class AgedDebtor:
    amount_sum: Optional[float] = None
    amount_type_code: Optional[str] = None
    amount_type_label: Optional[str] = None
    customer_group_code: Optional[str] = None
    demarcation_code: Optional[str] = None
    demarcation_label: Optional[str] = None
    financial_period_period: Optional[int] = None
    financial_year_end_year: Optional[int] = None
    item_code: Optional[str] = None
    item_composition: Optional[str] = None
    item_label: Optional[str] = None
    item_position_in_return_form: Optional[int] = None
    item_return_form_structure: Optional[str] = None
    period_length_length: Optional[str] = None


@dataclass
class AgedDebtorListMatch:
    amount_sum: Optional[float] = None
    amount_type_code: Optional[str] = None
    amount_type_label: Optional[str] = None
    customer_group_code: Optional[str] = None
    demarcation_code: Optional[str] = None
    demarcation_label: Optional[str] = None
    financial_period_period: Optional[int] = None
    financial_year_end_year: Optional[int] = None
    item_code: Optional[str] = None
    item_composition: Optional[str] = None
    item_label: Optional[str] = None
    item_position_in_return_form: Optional[int] = None
    item_return_form_structure: Optional[str] = None
    period_length_length: Optional[str] = None


@dataclass
class Fact:
    cell: Optional[list] = None
    summary: Optional[dict] = None
    total_cell_count: Optional[int] = None


@dataclass
class FactListMatch:
    cell: Optional[list] = None
    summary: Optional[dict] = None
    total_cell_count: Optional[int] = None


# frozen_string_literal: true

# Typed models for the MunicipalFinance SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# AgedCreditor entity data model.
#
# @!attribute [rw] amount_sum
#   @return [Float, nil]
#
# @!attribute [rw] amount_type_code
#   @return [String, nil]
#
# @!attribute [rw] amount_type_label
#   @return [String, nil]
#
# @!attribute [rw] demarcation_code
#   @return [String, nil]
#
# @!attribute [rw] demarcation_label
#   @return [String, nil]
#
# @!attribute [rw] financial_period_period
#   @return [Integer, nil]
#
# @!attribute [rw] financial_year_end_year
#   @return [Integer, nil]
#
# @!attribute [rw] item_code
#   @return [String, nil]
#
# @!attribute [rw] item_composition
#   @return [String, nil]
#
# @!attribute [rw] item_label
#   @return [String, nil]
#
# @!attribute [rw] item_position_in_return_form
#   @return [Integer, nil]
#
# @!attribute [rw] item_return_form_structure
#   @return [String, nil]
#
# @!attribute [rw] period_length_length
#   @return [String, nil]
AgedCreditor = Struct.new(
  :amount_sum,
  :amount_type_code,
  :amount_type_label,
  :demarcation_code,
  :demarcation_label,
  :financial_period_period,
  :financial_year_end_year,
  :item_code,
  :item_composition,
  :item_label,
  :item_position_in_return_form,
  :item_return_form_structure,
  :period_length_length,
  keyword_init: true
)

# Request payload for AgedCreditor#list.
#
# @!attribute [rw] aggregate
#   @return [String, nil]
#
# @!attribute [rw] cut
#   @return [String, nil]
#
# @!attribute [rw] drilldown
#   @return [String, nil]
#
# @!attribute [rw] order
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] pagesize
#   @return [Integer, nil]
AgedCreditorListMatch = Struct.new(
  :aggregate,
  :cut,
  :drilldown,
  :order,
  :page,
  :pagesize,
  keyword_init: true
)

# AgedDebtor entity data model.
#
# @!attribute [rw] amount_sum
#   @return [Float, nil]
#
# @!attribute [rw] amount_type_code
#   @return [String, nil]
#
# @!attribute [rw] amount_type_label
#   @return [String, nil]
#
# @!attribute [rw] customer_group_code
#   @return [String, nil]
#
# @!attribute [rw] demarcation_code
#   @return [String, nil]
#
# @!attribute [rw] demarcation_label
#   @return [String, nil]
#
# @!attribute [rw] financial_period_period
#   @return [Integer, nil]
#
# @!attribute [rw] financial_year_end_year
#   @return [Integer, nil]
#
# @!attribute [rw] item_code
#   @return [String, nil]
#
# @!attribute [rw] item_composition
#   @return [String, nil]
#
# @!attribute [rw] item_label
#   @return [String, nil]
#
# @!attribute [rw] item_position_in_return_form
#   @return [Integer, nil]
#
# @!attribute [rw] item_return_form_structure
#   @return [String, nil]
#
# @!attribute [rw] period_length_length
#   @return [String, nil]
AgedDebtor = Struct.new(
  :amount_sum,
  :amount_type_code,
  :amount_type_label,
  :customer_group_code,
  :demarcation_code,
  :demarcation_label,
  :financial_period_period,
  :financial_year_end_year,
  :item_code,
  :item_composition,
  :item_label,
  :item_position_in_return_form,
  :item_return_form_structure,
  :period_length_length,
  keyword_init: true
)

# Request payload for AgedDebtor#list.
#
# @!attribute [rw] aggregate
#   @return [String, nil]
#
# @!attribute [rw] cut
#   @return [String, nil]
#
# @!attribute [rw] drilldown
#   @return [String, nil]
#
# @!attribute [rw] order
#   @return [String, nil]
#
# @!attribute [rw] page
#   @return [Integer, nil]
#
# @!attribute [rw] pagesize
#   @return [Integer, nil]
AgedDebtorListMatch = Struct.new(
  :aggregate,
  :cut,
  :drilldown,
  :order,
  :page,
  :pagesize,
  keyword_init: true
)

# Fact entity data model.
#
# @!attribute [rw] cells
#   @return [Array, nil]
#
# @!attribute [rw] summary
#   @return [Hash, nil]
#
# @!attribute [rw] total_cell_count
#   @return [Integer, nil]
Fact = Struct.new(
  :cells,
  :summary,
  :total_cell_count,
  keyword_init: true
)

# Request payload for Fact#list.
#
# @!attribute [rw] cut
#   @return [String, nil]
#
# @!attribute [rw] drilldown
#   @return [String, nil]
FactListMatch = Struct.new(
  :cut,
  :drilldown,
  keyword_init: true
)


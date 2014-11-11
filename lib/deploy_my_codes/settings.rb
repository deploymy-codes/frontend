require 'ostruct'

module DeployMyCodes
  class Settings < OpenStruct
    def initialize(hash = {})
      @table      = {}
      @hash_table = {}

      hash.each do |key, value|
        @table[key.to_sym]      = (value.is_a?(Hash) ? self.class.new(value) : value)
        @hash_table[key.to_sym] = value

        new_ostruct_member(key)
      end
    end
  end
end

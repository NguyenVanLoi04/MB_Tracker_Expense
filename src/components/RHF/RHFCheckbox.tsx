import React from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, SPACING } from "../../constants/theme";
import { Icon } from "../Icon";

interface RHFCheckboxProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
}

export const RHFCheckbox = <T extends FieldValues>({
  name,
  label,
}: RHFCheckboxProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <TouchableOpacity
          style={styles.container}
          activeOpacity={0.7}
          onPress={() => onChange(!value)}
        >
          <View style={[styles.checkbox, value && styles.checkboxSelected]}>
            {value && <Icon name="check" size={14} color={COLORS.white} />}
          </View>
          <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: COLORS.gray[300],
    justifyContent: "center",
    alignItems: "center",
    marginRight: SPACING.sm,
  },
  checkboxSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  label: {
    fontSize: 14,
    color: COLORS.text,
  },
});

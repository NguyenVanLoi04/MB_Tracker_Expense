import React, { useState } from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, RADIUS, SPACING } from "../../constants/theme";
import { Icon } from "../Icon";

interface RHFInputProps<T extends FieldValues> extends TextInputProps {
  name: Path<T>;
  label?: string;
  icon?: string;
  isPassword?: boolean;
}

export const RHFInput = <T extends FieldValues>({
  name,
  label,
  icon,
  isPassword,
  ...textInputProps
}: RHFInputProps<T>) => {
  const { control } = useFormContext<T>();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View style={styles.inputGroup}>
          {label && <Text style={styles.label}>{label}</Text>}
          <View
            style={[
              styles.inputContainer,
              isFocused && styles.inputContainerFocused,
              error && styles.inputContainerError,
            ]}
          >
            {icon && (
              <Icon
                name={icon}
                size={20}
                color={
                  isFocused
                    ? COLORS.primary
                    : error
                      ? COLORS.danger
                      : COLORS.gray[400]
                }
                style={styles.inputIcon}
              />
            )}
            <TextInput
              style={styles.input}
              value={value}
              onChangeText={onChange}
              onBlur={() => {
                onBlur();
                setIsFocused(false);
              }}
              onFocus={() => setIsFocused(true)}
              secureTextEntry={isPassword && !isPasswordVisible}
              placeholderTextColor={COLORS.gray[400]}
              {...textInputProps}
            />
            {isPassword && (
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                style={styles.eyeIcon}
              >
                <Icon
                  name={isPasswordVisible ? "eye-off" : "eye"}
                  size={20}
                  color={COLORS.gray[400]}
                />
              </TouchableOpacity>
            )}
          </View>
          {error && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: COLORS.gray[200],
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md,
    height: 56,
  },
  inputContainerFocused: {
    borderColor: COLORS.primary,
  },
  inputContainerError: {
    borderColor: COLORS.danger,
  },
  inputIcon: {
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
    height: "100%",
  },
  eyeIcon: {
    padding: SPACING.xs,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});

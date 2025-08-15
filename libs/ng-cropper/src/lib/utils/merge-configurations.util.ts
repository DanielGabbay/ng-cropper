/**
 * Generic function to deeply merge configuration objects with proper handling of special types
 */
export function mergeConfigurations<T extends Record<string, unknown>>(baseConfig: T, partialConfig: Partial<T> | undefined, overrides: Partial<T> = {}): T {
    if (!partialConfig) {
        return { ...baseConfig, ...overrides };
    }

    const result = { ...baseConfig } as Record<string, unknown>;

    // Apply partial config first
    for (const [key, value] of Object.entries(partialConfig)) {
        if (value !== undefined) {
            if (value instanceof Set) {
                // Handle Set objects - replace completely
                result[key] = value;
            } else if (Array.isArray(value)) {
                // Handle arrays - convert to Set if the base property is a Set
                if (baseConfig[key] instanceof Set) {
                    result[key] = new Set(value);
                } else {
                    result[key] = value;
                }
            } else if (value && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Set)) {
                // Handle nested objects - deep merge
                const baseValue = baseConfig[key];
                if (baseValue && typeof baseValue === 'object' && !Array.isArray(baseValue)) {
                    result[key] = { ...(baseValue as Record<string, unknown>), ...(value as Record<string, unknown>) };
                } else {
                    result[key] = value;
                }
            } else {
                // Handle primitives and other types
                result[key] = value;
            }
        }
    }

    // Apply overrides last (highest priority)
    for (const [key, value] of Object.entries(overrides)) {
        if (value !== undefined) {
            result[key] = value;
        }
    }

    return result as T;
}

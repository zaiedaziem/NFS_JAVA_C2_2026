package com.example.supportdesk.util;

/*
Validation: decides whether an input is allowed at all (e.g. @NotBlank, @Pattern).
Sanitisation: cleans up input that is already allowed, before it gets stored.

"   Cannot connect to VPN   " -> "Cannot connect to VPN"   trim spaces
"open"                        -> "OPEN"                    uppercase a code-like field
control characters in text    -> removed, not stored
"<script>alert(1)</script>"   -> validation should reject this, not sanitisation hide it
*/
public final class InputSanitizer {

    private InputSanitizer() {
        // Utility class - no instances
    }

    // Trims whitespace and converts an empty result to null.
    public static String trimToNull(String value) {
        if (value == null) {
            return null;
        }

        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }

    // Cleans free text (titles, descriptions, categories): trims, strips real control
    // characters (e.g. stray null bytes or non-printable input), and collapses runs of
    // whitespace into a single space. Deliberately does NOT strip normal punctuation -
    // a ticket description like "Cannot connect to VPN!" should stay exactly as typed.
    public static String cleanText(String value) {
        String trimmed = trimToNull(value);

        if (trimmed == null) {
            return null;
        }

        return trimmed
                .replaceAll("\\p{Cntrl}", "")
                .replaceAll("\\s+", " ")
                .trim();
    }

    // Normalizes a code-like field (priority, status): cleans it, then uppercases it.
    public static String upperCode(String value) {
        String cleaned = cleanText(value);
        return cleaned == null ? null : cleaned.toUpperCase();
    }
}

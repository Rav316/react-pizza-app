package ru.alex.dto.error;

import java.time.Instant;

public record ErrorResponse (
        Instant date,
        String message
) {
}

# ER Diagram

```mermaid
---
config:
  theme: redux-color
---
erDiagram
    USER ||--o{ PASSENGER : "creates master list of"
    USER ||--o{ BOOKING : "books for"
    USER ||--o{ AUDIT_LOG : "performs actions"
    USER ||--|| ROLES : "has"
    BOOKING ||--o{ BOOKED_PASSENGER : "has"
    BOOKED_PASSENGER ||--|| PASSENGER : "refers to"
    BOOKING ||--o{ BOOKED_SEAT : "reserves"
    BOOKED_PASSENGER ||--|| BOOKED_SEAT : "is assigned"
    BOOKED_SEAT ||--|| SEAT : "reserves"
    SEAT }o--|| COACH : "is in"
    COACH }o--|| TRAIN : "is part of"
    COACH }o--|| COACH_TYPE : "categorized as"
    TRAIN ||--o{ SCHEDULE : "has"
    SCHEDULE ||--o{ BOOKING : "is for"
    SCHEDULE }o--|| STATION : "departs from"
    SCHEDULE }o--|| STATION : "arrives at"
    SCHEDULE ||--o{ SCHEDULE_STOP : "has"
    SCHEDULE_STOP }o--|| STATION : "stops at"
    BOOKING ||--o{ PAYMENT : "is paid via"
    PAYMENT ||--o{ REFUND : "can have"
    FARE_RATE ||--|| TRAIN : "for"
    FARE_RATE ||--|| COACH_TYPE : "for"
    STATION_DISTANCE ||--|| STATION : "from station"
    STATION_DISTANCE ||--|| STATION : "to station"
    BOOKING ||--|| BOOKING_STATUSES : "has status"
    PAYMENT ||--|| PAYMENT_STATUSES : "has status"
    REFUND ||--|| REFUND_STATUSES : "has status"
    USER {
        int id PK
        string email
        string password_hash
        string name
        int role_id FK
    }
    ROLES {
        int id PK
        string name
    }
    PASSENGER {
        int id PK
        int user_id FK
        string name
        string gender
        string age
    }
    TRAIN {
        int id PK
        string train_number
        string name
    }
    COACH_TYPE {
        int id PK
        string type_name
        string description
    }
    COACH {
        int id PK
        int train_id FK
        int coach_type_id FK
        string code
    }
    SEAT {
        int id PK
        int coach_id FK
        string seat_number
        string seat_type 
    }
    SCHEDULE {
        int id PK
        int train_id FK
        date departure_date
        time departure_time
    }
    STATION {
        int id PK
        string code
        string name
        string city
    }
    SCHEDULE_STOP {
        int id PK
        int schedule_id FK
        int station_id FK
        int stop_number
        time arrival_time
        time departure_time
        float distance_from_origin
    }
    BOOKING {
        int id PK
        int user_id FK
        int schedule_id FK
        int from_station_id FK
        int to_station_id FK
        date booking_date
        int status_id FK
        string pnr
        float total_amount
    }
    BOOKING_STATUSES {
        int id PK
        string status_name
    }
    BOOKED_PASSENGER {
        int id PK
        int booking_id FK
        string name "Snapshot name"
        string gender "Snapshot gender"
        string age "Snapshot age"
    }
    BOOKED_SEAT {
        int id PK
        int booking_id FK
        int booked_passenger_id FK
        int seat_id FK
    }
    PAYMENT {
        int id PK
        int booking_id FK
        float amount
        int status_id FK
        date payment_date
    }
    PAYMENT_STATUSES {
        int id PK
        string status_name
    }
    FARE_RATE {
        int id PK
        int train_id FK
        int coach_type_id FK
        float rate_per_km
    }
    REFUND {
        int id PK
        int payment_id FK
        float amount
        int status_id FK
        date refund_date
    }
    REFUND_STATUSES {
        int id PK
        string status_name
    }
    AUDIT_LOG {
        int id PK
        int user_id FK
        timestamp timestamp
        string action
    }
    STATION_DISTANCE {
        int from_station_id PK, FK
        int to_station_id PK, FK
        float distance
    }


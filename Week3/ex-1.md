# Exercise-1

## Question-1: What columns violate 1NF?

### Answer-1

> 1NF Rules:

1. All data must be atomic (each column should only has a single value)
2. Should not be repeating columns
3. Prevent duplicate records
4. Attribute domain should not change (all values in a column must be of the same kind or type).

> Columns of the Table:

1. member_id: Violates rule 3 because of same ids
2. member_address: Violates rule 1 because it has house number and street name together
3. dinner_date: Violates rule 4 because date formats are different
4. food_code,food_description: Violates rule 1 because it contains many values

## Question-2: What entities do you recognize that could be extracted?

### Answer-2

`Member`, `Dinner`, `Venue`, and `Food` entities could be extracted as a separated table.

## Question-3: Name all the tables and columns that would make a 3NF compliant solution

### Answer-3

> Table 1: member

| PK(id) | name  | address       |
| ------ | ----- | ------------- |
| 1      | Ali   | Oegstgeest 51 |
| 2      | Aykut | Amsterdam 322 |

> Table 2: dinner

| PK(id) | date             | FK(venue.code) |
| ------ | ---------------- | -------------- |
| 1      | 05-04-2022 12:00 | R1             |
| 2      | 04-04-2022 14:00 | R2             |

> Table 3: food

| PK(code) | description |
| -------- | ----------- |
| C1       | Cake        |
| C2       | Cheese      |

> Table 4: venue

| PK(code) | description           |
| -------- | --------------------- |
| R1       | Tea Garden Restaurant |
| R2       | Restaurant for Coffee |

> Table 5: order

| PK(id) | FK(member.id) | FK(dinner.id) | FK(food.code) | quantity |
| ------ | ------------- | ------------- | ------------- | -------- |
| 1      | 1             | 1             | C2            | 1        |
| 2      | 1             | 1             | C1            | 2        |
| 3      | 2             | 2             | C2            | 5        |

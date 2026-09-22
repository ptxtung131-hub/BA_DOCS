# SRS — Checkout Flow (UC 2.1–2.8) — Stack Trading

| Field | Value |
|---|---|
| **Document Owner (this draft)** | Tùng — BA Intern, SotaTek JSC |
| **Source** | `stacktrading-docs.sotatek.works/docs/BA/UC_2.1-2.8` (UC_2.1-2.6_v1 = **v31**, updated 2026-09-18; UC_2.7-2.8_v1 = **v4.12**, updated 2026-09-16) — refreshed from prior draft (v29 / v4.12) |
| **Revision Note** | This revision cross-checked every Screen Description section against a fresh pull of the source doc (no Figma access used — Figma still returns 403, per prior conversation). See the **CHANGELOG** delivered separately in chat for the full list of edits. |
| **Wireframe Reference** | Figma: `StackTrading (Clone Des)` — file key `6q0wieVbZehGlRHj5p2fnL` |
| **Scope** | Full Checkout Flow — Step 0 (System Init) → Step 7 (Provisioning & Redirect to Login) |
| **Format** | `/srs-writer` template (Use Case Table / Activity Flow / Screen Description / Business Rules / Message List) |
| **⚠️ Wireframe Access Note** | Claude does not have edit/view access to the Figma file above (403 — no shared access). Screen Description tables below are reconstructed **from the SRS source doc's own field-level descriptions**, not from visually inspecting the Figma frames. Where the source doc explicitly flags a wireframe as outdated (CR references), this is called out in **§0 — Wireframe Gap Log** below. Recommend re-running this skill once Figma access is granted, to cross-check pixel-level layout. |

---

## 0. WIREFRAME GAP LOG (Figma vs. Current SRS Source)

> Per your note — the wireframe is **not fully synced** with the docs. Below is every place the source SRS itself flags a mismatch, plus gaps Claude inferred from missing wireframe references. Use this as your punch-list when reviewing Figma frames against this SRS.

| # | Area | What the wireframe likely still shows | What is actually current (per CR) | Action needed |
|---|---|---|---|---|
| 1 | Step 6 — Payment methods (Flow A/H/I/J) | Skrill as a selectable payment method | **[CHR-23]** Skrill REMOVED entirely | Remove Skrill tile from all Step 6 frames |
| 2 | Step 6 — Regional Aggregators | Nomupay, Nuvei, EBANX as popup-based payment options | Nomupay & Nuvei **removed**; EBANX renamed/replaced by **Dusupay** (redirect-tab pattern) + new **T365** method | Redesign Step 6 regional payment section — no more "hosted popup", now full-tab redirect + dedicated `FP-06` "Verifying Your Payment..." screen |
| 3 | Step 7 Phase 2 — Account Claim | A "Create Password" field on the Claim Account screen | **[CHR-11]** Password field REMOVED — user only enters Phone Number now (password is not user-set at this phase) | Remove password field(s) from Claim Account frame |
| 4 | Step 7 Phase 1 wireframe filename | `Checkout Flow - Step 6 - payment lock (failed 5 times within 10 minutes).png` — filename implies IP-based lock | **[CHR-9]** Lock is now **Email-based**, not IP-based (copy content should reflect this if the overlay text mentions "this device/IP") | Verify OV-03 overlay copy references email, not device/IP |
| 5 | Step 5 — Billing Address fields | Static Country/State/City dropdowns, likely no autocomplete | **[CHR-87]** Google Places Autocomplete added; City is **cascading** from State/Region (**[CHR-90]**); ZIP field is conditionally shown per `zip_requirements` map (**[CHR-6]**) | Wireframe needs autocomplete UI + conditional ZIP field state + City-disabled-until-Region-selected state |
| 6 | Step 3 — Platform tiles | Likely still shows "NinjaTrader 8" logo/label | Renamed to **TradeSea** (same gateway, Rithmic) | Swap logo/label asset |
| 7 | Step 6 — Crypto payment | No explicit "pending removal" flag | **CR-20260810-001**: Crypto/Triple-A is pending removal — logic unchanged for now, but flag for design/dev that this may be cut before launch | No visual change needed yet — but do NOT invest further design polish here until confirmed |
| 8 | Order Summary (Step 6) | No "Subtotal" row between Discount and Tax | **[CHR-51]** New **Subtotal** row required, positioned directly below the Discount line | Add Subtotal row to Order Summary frame |
| 9 | Step 2 — Pricing cards | Prices shown: $650 / $1,250 / $4,500 (per original RFQ) | Current Table J snapshot: $650 / $1,250 / **$7,000** (Advanced tier price changed) | Verify current Figma numbers against live Table J before freezing visual comps — **[CHR-49]** also makes the 14%/7.5% target/stop dynamic-rendered, not static text |
| 10 | Step 7 Phase 1 — Post-payment restricted region | No wireframe found for "refund in progress" / "refunded" states | Two distinct states exist: `BN-03a` (refunding) and `BN-03b` (refunded) — wireframes referenced in source doc but not confirmed present in Figma | Confirm these 2 states exist as separate frames; if missing, flag as a new screen to design |
| 11 | FP-06 "Verifying Your Payment..." | Likely does not exist yet as a distinct frame (this screen did not exist in the original RFQ — it's new for Dusupay/T365 redirect pattern) | Required standalone full-page screen: spinner + "Verifying Your Payment..." + eventual `BN-12`/`BN-01` banner + [Return to Payment page] button | **New screen to design if not already present** |
| 12 | Step 6 — Promo code | Static "Promo code (CODE): −$XX" line only | New required elements: **locked input** state after apply, **[Remove]** button swap, **Subtotal** row (see #8) | Add locked/unlocked states + Remove button to promo section frame |

**⚠️ Cần xác nhận với BAL:** confirm items #7, #10, #11 directly — Claude could not verify Figma frame existence without file access; these are inferred gaps based on the SRS text alone.

**Update from this revision (docs-only re-check, no Figma access used):** Items #1, #3, #4 above are now independently confirmed **word-for-word** by the source doc's own "CR Priority" header box: *"[CHR-23] overrides Wireframe Step 6 Flow A/H/I/J: Skrill REMOVED from payment methods. Wireframes are outdated."* / *"[CHR-11] ... Password field REMOVED from Phase 2."* / the Email-lock wireframe filename is explicitly annotated in-doc as *"(wireframe filename unchanged; lock is now keyed by email, Ref: CHR-9)"* — i.e. the source doc itself flags that specific file as stale. These three items can now be treated as fully verified, not just inferred.

---

## TABLE OF CONTENTS

| Step | Use Cases | Description |
|---|---|---|
| Step 0 | UC_2.1.1 – UC_2.1.5 | System Initialization & Access Gates |
| Step 1 | UC_2.2 | Asset Class Selection |
| Step 2 | UC_2.3 | Capital Allocation Selection |
| Step 3 | UC_2.4 | Platform Selection |
| Step 4 | UC_2.5 | Market Data Selection (Futures only) |
| Step 5 | UC_2.6.1 – UC_2.6.2 | PII Capture, Compliance & Cart Abandonment |
| Step 6 | UC_2.7.1 – UC_2.7.9 | Checkout & Payment |
| Step 7 | UC_2.8.1 – UC_2.8.4 | Order Processing & Provisioning |

---
---

# STEP 0 — SYSTEM INITIALIZATION & ACCESS GATES

## UC_2.1.1 — System Status API

### 1. USE CASE SPECIFICATION TABLE

| Field | Content |
|---|---|
| **Use Case ID** | UC_2.1.1 |
| **Use Case Name** | System Status API |
| **Use Case Description** | This use case allows the System to retrieve, in a single call, all geo-routing, pricing, cohort, and payment-method configuration needed to render the entire checkout flow, in order to avoid repeated API calls and centralize checkout state. |
| **Actor(s)** | User (implicit — triggers via page load), System, Cloudflare (geo-IP) |
| **Pre-Condition(s)** | User is on the checkout page. No prior `GET /system/status` response exists in the current session. |
| **Trigger** | User navigates to the dedicated checkout page URL for the first time in the session. |
| **Post-Condition(s)** | Full response payload stored in global checkout state. Gate 1 and Gate 2 conditions evaluated immediately. |
| **Basic Flow** | 1. User navigates to checkout page. 2. Frontend calls `GET /system/status` (Cloudflare headers `CF-IPCountry`/`CF-Region` auto-included). 3. Backend processes in order: Geo-IP Gate → Waitlist Gate → UI Routing → Gateway Filtering & Localization → Cohort & Pricing → Launch Phase & Pass Rate. 4. Backend returns JSON (unless early-returned at Geo-IP or Waitlist gate). 5. Frontend stores full response in global checkout state. |
| **List Screen** | Checkout page (dedicated route, no Marketing Header/Footer except on Gate 1 redirect) |
| **Exception Flow** | E1 — Network error/timeout: Ref TE-SYS-01, checkout UI not rendered. E2 — HTTP 5xx: Ref FP-03, full-page error. E3 — Geo headers missing/empty/"XX": defaults to `geo_country='US'`, `required_flow='FLOW_A'`, user NOT blocked. E4 — `checkout_ui_routing` returns 0 rows: defaults to `FLOW_A`, user NOT blocked. |

### 2. ACTIVITY FLOW

```
flowchart TD
    subgraph User
        A([Start: Navigate to Checkout URL])
    end

    subgraph System
        B[Call GET /system/status]
        C{Step 3a: Geo-IP Gate<br/>Match Compliance_geo_restrictions?}
        D[Return geo_blocked=true<br/>SKIP remaining steps]
        E{Step 3b: Waitlist Gate<br/>Allow_New_Signups?}
        F[Return payload<br/>SKIP remaining steps]
        G[Step 3c: UI Routing<br/>Query checkout_ui_routing]
        H[Step 3d: Gateway Filtering<br/>Query Payment_Method_Config]
        I[Step 3e: Cohort and Pricing<br/>Query Table C + Table J]
        J[Step 3f: Launch Phase and Pass Rate<br/>Query Platform_Configuration]
        K[Return full JSON payload]
    end

    subgraph Frontend
        L[Store response in<br/>global checkout state]
        M[Render Gate 2 - Geoblock]
        N[Redirect to Waitlist page]
        O[Render Step 1]
    end

    A --> B --> C
    C -- Match: TRUE --> D --> M
    C -- No match: FALSE --> E
    E -- FALSE --> F --> N
    E -- TRUE --> G --> H --> I --> J --> K --> L --> O
```

### 3. SCREEN DESCRIPTION

N/A — this use case is a background API call with no dedicated screen. It governs which downstream screen renders (Step 1, Gate 1 Waitlist, or Gate 2 Geoblock — see their own UCs).

### 4. BUSINESS RULES

| # | BR Code | Function | Description |
|---|---|---|---|
| 1 | BR_2.1.1.1 | Single Call Per Session | `GET /system/status` called exactly once per checkout page load. Step navigation (Steps 1–5) does NOT trigger a new call. Full page refresh (F5) triggers a new call to re-hydrate global state — but does NOT discard in-progress step/data (see BR_2.1.1.3). |
| 2 | BR_2.1.1.2 | Response Persistence | Full API response stored in global checkout state. All subsequent steps read from cached state — no re-fetching. |
| 3 | BR_2.1.1.3 | Checkout Routing & Session Recovery Matrix | Governs all reload (F5) / deep-link / back-navigation behavior across Steps 1–7.3. See full 3-table matrix in source doc §BR_2.1.1.3 — summarized: Steps 1–5 always preserve data on reload if local storage cart state exists; Step 6 routes directly to final payment state (no re-render of processing overlay) on reload; Step 7.1 preserves entered phone + valid JWT (48h); Step 7.3 checks `account_status` and either redirects to login or continues waiting indefinitely. |
| 4 | BR_2.1.1.4 | UTM Capture — Global, Root Layout (Ref: CR-12) | UTM values read from `localStorage` (written by CR-12 root-layout script), NOT re-parsed from URL at Step 0. Applies on every branch, including Gate 1 (Waitlist) interception. **Last-touch attribution**: new URL UTM params overwrite `localStorage`; absence of URL params leaves existing value untouched (not cleared). |
| 5 | (Referenced) CR-12 | UTM Attribution Capture | See Common Rules doc. All downstream consumers (Step 5, `/capture-lead`, `/execute-checkout`, Waitlist direct API calls) read the CURRENT `localStorage` value at their own moment of action, not a value cached once at Step 0. |

**Response Payload Schema (for reference):**

```
{
  "Global_Var_Allow_New_Signups": boolean,
  "is_founder_cohort": boolean,
  "pricing_tiers": { "EVAL_L1": float, "EVAL_L2": float, "EVAL_L5": float },
  "geo_blocked": boolean,
  "geo_country": string,
  "geo_region": string,
  "required_flow": string,
  "methods": [ { "id": string, "label": string, "explanatory_text": string, "cta_text": string, "icon_tags": [string] } ],
  "is_launch_phase": boolean,
  "historical_pass_rate": float,
  "zip_requirements": { "US": boolean, "CA": boolean, "...": boolean }
}
```
> `current_price` and `founder_count` have been REMOVED from this response (do not reference in dev/QA test cases).

### 5. MESSAGE LIST

| # | Message Code | Type | Message (EN) | Message (VN) | Trigger |
|---|---|---|---|---|---|
| 1 | TE-SYS-01 | Error | (Cần xác nhận: exact wording — xem Common Rule > List Toast & Popup) | (Cần xác nhận) | Network error/timeout on `GET /system/status` |
| 2 | FP-03 | Error (Full-page) | (Cần xác nhận: exact wording) | (Cần xác nhận) | HTTP 5xx from `GET /system/status` |

---

## UC_2.1.2 — Geo-Based Compliance UI Variants (Flow A–J)

### 1. USE CASE SPECIFICATION TABLE

| Field | Content |
|---|---|
| **Use Case ID** | UC_2.1.2 |
| **Use Case Name** | Geo-Based Compliance UI Variants (Flow A–J) |
| **Use Case Description** | This use case allows the System to render the correct region-specific compliance disclosures and checkboxes at Step 5, in order to satisfy local regulatory requirements without manual per-country customization by developers. |
| **Actor(s)** | System |
| **Pre-Condition(s)** | `required_flow` stored in global checkout state (from Step 0). |
| **Trigger** | Step 5 renders. |
| **Post-Condition(s)** | Correct flow-specific compliance content (disclosures + checkboxes) is displayed. |
| **Basic Flow** | 1. Step 5 mounts. 2. Frontend reads `required_flow` from state. 3. Frontend renders the matching hardcoded UI variant per the routing table below. |
| **List Screen** | Step 5 (PII & Compliance) |
| **Exception Flow** | N/A — routing itself has no failure state; unmatched country defaults to Flow A at the backend level (see UC_2.1.1). |

### 2. ROUTING TABLE (Flow A–J)

| Flow | Countries / Regions | UI Behavior at Step 5 |
|---|---|---|
| **A** | USA + all unmatched (default) | 2 standard checkboxes only |
| **B** | UK, Australia | 2 checkboxes + pass-rate disclosure (varies by `is_launch_phase`) |
| **C** | EU/EEA (29 countries) | 2 checkboxes + pass-rate disclosure + 1 EU 14-day waiver checkbox (3 total) |
| **D** | Canada — Quebec only | Entire checkout UI (Steps 1–7) in French, incl. all labels/errors/toasts. Standard 2 checkboxes (FR) |
| **E** | UAE | 2 checkboxes + DFSA/ADGM non-regulation disclaimer |
| **F** | Sanctioned countries | Hard block — Gate 2 (UC_2.1.4). Step 5 never reached |
| **G** | India | 2 standard checkboxes only |
| **H** | Philippines | 2 standard checkboxes only |
| **I** | Brazil | 2 standard checkboxes only |
| **J** | South Africa | 2 standard checkboxes only |

### 3. SCREEN DESCRIPTION

| # | Component | Type | Required? | Description |
|---|---|---|---|---|
| 1 | Checkbox 1 — Commercial Acknowledgment | Checkbox | Yes | **Description:** Confirms user understands they are purchasing a skills-assessment evaluation, not opening a brokerage account. **Displaying Rules:** Default unchecked, all flows except F. Exact text: *"I acknowledge that I am purchasing a skills assessment software evaluation for commercial purposes to secure an independent contractor agreement with a US-domiciled C-Corporation, and I am not opening a retail financial, brokerage, or investment account."* **Behaviour Rules:** N/A. **Validation Rules:** Must be checked before [Next] enables (Ref: BR_2.6.1.2). |
| 2 | Checkbox 2 — Age & ToS | Checkbox | Yes | **Description:** Confirms age ≥18 and agreement to ToS. **Displaying Rules:** Default unchecked. Text: *"By clicking 'Complete Purchase', I confirm that I am at least 18 years of age and agree to the Terms of Service for the Data Processing and Performance Evaluation Service (Associate Track)."* The words "Terms of Service" are a clickable hyperlink. **Behaviour Rules:** Click "Terms of Service" → opens popup/modal with ToS content (same as public `/terms` page) — does NOT navigate away or reset checkout. Closing popup preserves all form state. **Validation Rules:** Must be checked before [Next] enables. |
| 3 | Checkbox 3 — EU Withdrawal Waiver (Flow C only) | Checkbox | Yes (Flow C only) | **Description:** EU-specific 14-day withdrawal waiver, legally required for EU/EEA. **Displaying Rules:** Only rendered for Flow C. Default unchecked. Text: *"I expressly consent to the immediate commencement of the digital evaluation service and waive my 14-day right of withdrawal under EU consumer protection law."* Positioned between standard checkboxes and [Next]. **Behaviour Rules:** N/A. **Validation Rules:** Must be checked before [Next] enables (Flow C only). |
| 4 | Pass-Rate Disclosure (Flow B, C) | Static Text | N/A | **Description:** Discloses historical pass rate or launch-phase unavailability. **Displaying Rules:** Above standard checkboxes. If `is_launch_phase = TRUE`: *"This is a newly launched proprietary trading evaluation program. Historical pass-rate and success data is currently unavailable."* Else: *"Historically, only [historical_pass_rate]% of participants successfully pass the evaluation to become authorized traders."* Same text for UK & Australia. **Behaviour/Validation:** N/A. |
| 5 | UAE Disclaimer (Flow E) | Static Text | N/A | **Description:** Discloses non-regulation status in UAE. **Displaying Rules:** Above standard checkboxes, Flow E only. Text: *"Stack Trading is a U.S.-domiciled entity and is not licensed, registered, or regulated by the Dubai Financial Services Authority (DFSA) or the Abu Dhabi Global Market (ADGM)."* |
| 6 | Hypothetical Performance Disclaimer (All flows) | Static Text | N/A | **Description:** Mandatory legal disclaimer on simulated performance. **Displaying Rules:** Always visible, non-collapsible, all flows. Full CFTC-style disclaimer text (see source doc §9). No user interaction. |

### 4. BUSINESS RULES

| # | BR Code | Function | Description |
|---|---|---|---|
| 1 | BR_2.1.2.1 | Flow-to-UI Mapping is Frontend-Hardcoded | The mapping of `required_flow` → UI content is hardcoded in frontend (fixed enum switch). Changing content requires a FE code change. |
| 2 | BR_2.1.2.2 | Country-to-Flow Assignment is Dynamic (DB-Driven) | Which country maps to which flow is managed via `checkout_ui_routing` PostgreSQL table — Ops-configurable without code deploy. |

### 5. MESSAGE LIST

N/A — this UC has no error/toast messages of its own; all content is static disclosure text (see §3).

---

## UC_2.1.3 — Gate 1: Waitlist

### 1. USE CASE SPECIFICATION TABLE

| Field | Content |
|---|---|
| **Use Case ID** | UC_2.1.3 |
| **Use Case Name** | Gate 1 — Waitlist |
| **Use Case Description** | This use case allows the User to join a waitlist when new signups are paused, in order to be notified and retain their place once enrollment reopens. |
| **Actor(s)** | User, ActiveCampaign, Klaviyo |
| **Pre-Condition(s)** | User is on checkout page. `GET /system/status` returns `Global_Var_Allow_New_Signups == FALSE`. |
| **Trigger** | `Global_Var_Allow_New_Signups == FALSE` detected in `/system/status` response. |
| **Post-Condition(s)** | Direct API calls fired to BOTH Klaviyo and ActiveCampaign with email + UTM. Page shows success state. |
| **Basic Flow** | 1. `/system/status` returns flag FALSE. 2. Frontend redirects (client-side, same tab) to dedicated Waitlist page — Marketing Header/Footer rendered. 3. User selects Primary Market (Futures/Forex). 4. User enters email. 5. User clicks [Join Waitlist]. 6. Button → "Processing..." (disabled). Frontend reads UTM from `localStorage`, calls Klaviyo + ActiveCampaign APIs directly and in parallel. 7. On success → success state (Ref: OV-04). 8. User clicks [Return to Homepage] → navigated to homepage. |
| **List Screen** | Waitlist Page |
| **Exception Flow** | E1 — CRM API fails on submit: Ref BN-02. Button reverts to "Join Waitlist" (enabled). Form data NOT cleared. |

### 2. ACTIVITY FLOW

```
flowchart TD
    subgraph User
        A([Start]) --> B[Select Primary Market]
        B --> C[Enter Email]
        C --> D[Click Join Waitlist]
        H[See success state] --> I([End - Return to Homepage])
        J[See error banner] --> D
    end

    subgraph System
        E[Button to Processing state<br/>Read UTM from localStorage]
        F[Call Klaviyo API<br/>+ ActiveCampaign API<br/>in parallel]
        G{Both calls succeed?}
    end

    D --> E --> F --> G
    G -- Yes --> H
    G -- No --> J
```

### 3. SCREEN DESCRIPTION

| # | Component | Type | Required? | Description |
|---|---|---|---|---|
| 1 | Page Header — Title | Label | N/A | **Description:** Page title. **Displaying Rules:** Text: *"Be First on the Waitlist"*. Rendered below standard Marketing Header. |
| 2 | Page Header — Body | Label | N/A | **Displaying Rules:** Text: *"Enrollment is currently paused. Join the waitlist to secure your spot and you will be notified when we re-open."* |
| 3 | Primary Market | Dropdown (Single-selection) | Yes | **Description:** Lets user indicate which market they intend to trade. **Displaying Rules:** Placeholder *"Select primary market"*. Options: `Futures`, `Forex`. **Behaviour Rules:** Ref CR-03 (dropdown behavior). **Validation Rules:** Required — inline error if empty on submit. |
| 4 | Email | Textbox | Yes | **Description:** Captures lead email for CRM. **Displaying Rules:** Placeholder *"Enter email"*. **Validation Rules:** Required, format per CR-09 §9.1. |
| 5 | [Join Waitlist] | Button (Primary) | N/A | **Description:** Submits lead to CRM systems. **Behaviour Rules:** On click → validate all fields; invalid → inline errors, no submit. Valid → "Processing..." (disabled) → parallel Klaviyo + ActiveCampaign calls with email + UTM. On CRM fail → reverts to enabled, Ref BN-02, form preserved. On success → Ref OV-04. |

### 4. BUSINESS RULES

| # | BR Code | Function | Description |
|---|---|---|---|
| 1 | BR_2.1.3.1 | Global Scope | `Global_Var_Allow_New_Signups == FALSE` is a global toggle — redirects ALL countries simultaneously. |
| 2 | BR_2.1.3.2 | No Interrupt Logic | If the flag changes to FALSE mid-checkout (user started when TRUE), the user completes the ENTIRE flow uninterrupted. Frontend does not re-check after initial load. |
| 3 | BR_2.1.3.3 | CRM-Side Deduplication (No Info Leakage) | No custom backend dedup check exists. Klaviyo/ActiveCampaign handle identity resolution natively. If email already exists, CRM silently dedupes/updates — frontend STILL shows OV-04 success regardless, to prevent revealing whether an email is already registered. |

### 5. MESSAGE LIST

| # | Message Code | Type | Message (EN) | Message (VN) | Trigger |
|---|---|---|---|---|---|
| 1 | OV-04 | Alert (Popup) — Success | (Cần xác nhận: exact wording) | (Cần xác nhận) | Waitlist join succeeds |
| 2 | BN-02 | Error (Banner) | (Cần xác nhận: exact wording) | (Cần xác nhận) | CRM API fails on Waitlist submit |
| 3 | CR-03 (referenced) | — | Dropdown validation — see Common Rules doc | — | Primary Market field |
| 4 | CR-09 §9.1 (referenced) | — | Email field validation — see Common Rules doc | — | Email field |

---

## UC_2.1.4 — Gate 2: Geoblock

### 1. USE CASE SPECIFICATION TABLE

| Field | Content |
|---|---|
| **Use Case ID** | UC_2.1.4 |
| **Use Case Name** | Gate 2 — Geoblock (Flow F) |
| **Use Case Description** | This use case allows the System to hard-block a user from a sanctioned jurisdiction, in order to comply with OFAC/FATF regulatory requirements. |
| **Actor(s)** | System, Cloudflare |
| **Pre-Condition(s)** | N/A |
| **Trigger** | `GET /system/status` returns HTTP 403 (`geo_blocked == true`, `CF-IPCountry`/`CF-Region` matches `Compliance_geo_restrictions`). |
| **Post-Condition(s)** | Entire checkout UI replaced by hard-stop block page. User cannot proceed. |
| **Basic Flow** | 1. `/system/status` returns HTTP 403. 2. Frontend renders full-page block (Ref FP-02) replacing entire checkout UI — no header/nav/footer/step indicators/appeal link. |
| **List Screen** | Gate 2 — Geoblock (full-page) |
| **Exception Flow** | N/A |

### 2. ACTIVITY FLOW

Not applicable as a distinct diagram — see UC_2.1.1 Activity Flow, branch "Match: TRUE" at the Geo-IP Gate decision node.

### 3. SCREEN DESCRIPTION

| # | Component | Type | Required? | Description |
|---|---|---|---|---|
| 1 | Full-page block message | Static Text | N/A | **Description:** Sole content of the page — no header, nav, footer, step indicator, or appeal link. **Displaying Rules:** Content defined at Ref FP-02, includes a support contact email. **Behaviour Rules:** None — page is a dead end (Ref BR_2.1.4.1). **Validation Rules:** N/A. |

### 4. BUSINESS RULES

| # | BR Code | Function | Description |
|---|---|---|---|
| 1 | BR_2.1.4.1 | Hard Stop — Full Page Replacement | HTTP 403 = absolute hard stop. Geoblock state replaces the ENTIRE checkout UI. Only the block message is shown. |

### 5. MESSAGE LIST

| # | Message Code | Type | Message (EN) | Message (VN) | Trigger |
|---|---|---|---|---|---|
| 1 | FP-02 | Error (Full-page) | (Cần xác nhận: exact wording, incl. support email) | (Cần xác nhận) | `geo_blocked = true` from `/system/status` |

---

## UC_2.1.5 — Pricing Engine

### 1. USE CASE SPECIFICATION TABLE

| Field | Content |
|---|---|
| **Use Case ID** | UC_2.1.5 |
| **Use Case Name** | Pricing Engine |
| **Use Case Description** | This use case allows the System to dynamically populate the correct price (Standard or Founder) for all 3 Evaluation Package tiers, in order to keep pricing centrally managed in Zapier Table J without requiring a code deploy for price changes. |
| **Actor(s)** | System |
| **Pre-Condition(s)** | `is_founder_cohort` and `pricing_tiers` available in global checkout state (from Step 0). |
| **Trigger** | Step 2 renders. |
| **Post-Condition(s)** | Correct pricing (Founder or Standard) displayed on all 3 cards. |
| **Basic Flow** | 1. Frontend reads `is_founder_cohort` from state. 2. If TRUE → render Founder Price column values with strikethrough Standard price. 3. If FALSE → render Standard price + "one-time" label. |
| **List Screen** | Step 2 (Capital Allocation Selection) |
| **Exception Flow** | E1 — Race Condition (Stale Pricing): triggered at Step 6 [Pay] click if Founder cohort sold out or tax changed between `/calculate-cart` and `/execute-checkout` → backend returns `PRICE_CHANGED` → Ref OV-08 (see UC_2.8.1). |

### 2. ACTIVITY FLOW

Not applicable as a distinct diagram — governed entirely by state read at Step 0; see UC_2.3 (Step 2) Screen Description for rendered result.

### 3. SCREEN DESCRIPTION

N/A — this UC has no unique screen; its output is rendered inside UC_2.3's pricing cards (Step 2).

### 4. BUSINESS RULES

| # | BR Code | Function | Description |
|---|---|---|---|
| 1 | BR_2.1.5.1 | Founder Cohort Detection | `is_founder_cohort = TRUE` → display Founder Price column (Table J). `FALSE` → Challenge Price column. Prices never hardcoded in FE — always read from `pricing_tiers`. |
| 2 | BR_2.1.5.2 | Race Condition — Stale Pricing | Triggered at Step 6 Pay click if server-side re-check detects Founder cohort sold out (reverts to Standard) OR tax rate changed since `/calculate-cart`. Returns `PRICE_CHANGED` — no charge, no promo reservation. FE dismisses OV-05, shows OV-08. [Refresh now] on OV-08 closes overlay + refreshes Order Summary, no full reload. |
| 3 | BR_2.1.5.3 | Price Data Source | Founder/Standard prices for all 3 tiers stored in Zapier Table J. Backend packs into `pricing_tiers` at Step 3e of `/system/status`. No additional API call needed at Step 2. |

**Current Table J Snapshot (Ops-editable, source of truth = Zapier, not this doc):**

| Track | Challenge Price | Futures Reset | Forex Reset | Extension Fee | Founder Price | Founder Reset Fee |
|---|---|---|---|---|---|---|
| Associate (L1) | $650 | $375 | $325 | $150 | $499 | $325 |
| Accelerated (L2) | $1,250 | $725 | $625 | $275 | $1,049 | $600 |
| Advanced (L5) | **$7,000** | $3,800 | $3,500 | $1,500 | **$5,599** | $3,250 |

### 5. MESSAGE LIST

| # | Message Code | Type | Message (EN) | Message (VN) | Trigger |
|---|---|---|---|---|---|
| 1 | OV-08 | Alert (Popup) | (Cần xác nhận: expected to communicate price/tax has changed and ask user to refresh) | (Cần xác nhận) | `PRICE_CHANGED` returned at `/execute-checkout` |

---
---

# STEP 1 — ASSET CLASS SELECTION

## UC_2.2 — Asset Class Selection

### 1. USE CASE SPECIFICATION TABLE

| Field | Content |
|---|---|
| **Use Case ID** | UC_2.2 |
| **Use Case Name** | Step 1: Asset Class Selection |
| **Use Case Description** | This use case allows the User to select their preferred trading asset class (Futures or Forex), in order to determine the subsequent step count and platform/risk configuration used throughout checkout. |
| **Actor(s)** | User |
| **Pre-Condition(s)** | `Global_Var_Allow_New_Signups == TRUE`. `geo_blocked == FALSE`. `/system/status` response stored in state. |
| **Trigger** | User passes Gate 1 and Gate 2 at Step 0. |
| **Post-Condition(s)** | `asset_class` stored in session state. User proceeds to Step 2. |
| **Basic Flow** | 1. Step 1 renders 2 cards: Futures, Forex. 2. User clicks one card. 3. Selection stored. 4. User clicks [Next] to proceed. |
| **List Screen** | Step 1 (Asset Class Selection) |
| **Exception Flow** | N/A |

### 2. ACTIVITY FLOW

```
flowchart TD
    subgraph User
        A([Start: Arrive at Step 1]) --> B{Select Futures or Forex}
        B -- Futures --> C[Click Futures card]
        B -- Forex --> D[Click Forex card]
        C --> E[Click Next]
        D --> E
    end

    subgraph System
        F[Store asset_class = FUTURES<br/>Progress bar: 7 steps total]
        G[Store asset_class = FOREX<br/>Progress bar: 6 steps total<br/>Step 4 omitted]
        H([Proceed to Step 2])
    end

    C --> F
    D --> G
    E --> H
```

### 3. SCREEN DESCRIPTION

| # | Component | Type | Required? | Description |
|---|---|---|---|---|
| 1 | Futures | Radio Group | Yes | **Description:** Selects Futures as the trading asset class. **Displaying Rules:** Title *"Futures"*, subtitle *"via CME"*. Default unselected. **Behaviour Rules:** On click → stores `asset_class='FUTURES'`, deselects Forex if selected. If switching FROM Forex: Step 3 platform selection resets, Step 4 (Market Data) re-added to flow, progress bar updates to 7 steps (Ref BR_2.2.3). **Validation Rules:** N/A. |
| 2 | Forex | Radio Group | Yes | **Description:** Selects Forex as the trading asset class. **Displaying Rules:** Title *"Forex"*, subtitle *"Currency pairs"*. Default unselected. **Behaviour Rules:** On click → stores `asset_class='FOREX'`, deselects Futures if selected. If switching FROM Futures: Step 3 platform selection resets, Step 4 removed from flow, progress bar updates to 6 steps (Ref BR_2.2.3). **Validation Rules:** N/A. |
| 3 | [Next] | Button (Primary) | N/A | **Description:** Proceeds to Step 2. **Displaying Rules:** N/A. **Behaviour Rules:** Disabled until one asset class selected; on click when enabled → navigate to Step 2. **Validation Rules:** N/A. |

### 4. BUSINESS RULES

| # | BR Code | Function | Description |
|---|---|---|---|
| 1 | BR_2.2.1 | Fixed Options | 2 options (Futures, Forex) hardcoded in FE — not API-driven. Both always displayed. |
| 2 | BR_2.2.2 | Session Persistence | Selection stored in session state for duration of checkout. Reload/recovery behavior governed centrally by BR_2.1.1.3 — refresh does NOT return user to Step 1 if local storage cart state is present. |
| 3 | BR_2.2.3 | Asset Class Change — Progress Bar & Step Count Impact | **Futures:** 7 steps (1→2→3→4→5→6→7). **Forex:** 6 steps (1→2→3→5→6→7, Step 4 omitted). Applies on initial selection AND when navigating back to change selection. Futures→Forex: Step 3 selection reset, Step 4 removed, bar → 6 steps. Forex→Futures: Step 3 reset, Step 4 added back, bar → 7 steps. **Step 5 data is NOT reset** on asset class change — only cleared on full page refresh. |

### 5. MESSAGE LIST

N/A — no error/toast messages in this UC.

---
---

# STEP 2 — CAPITAL ALLOCATION SELECTION

## UC_2.3 — Capital Allocation Selection

### 1. USE CASE SPECIFICATION TABLE

| Field | Content |
|---|---|
| **Use Case ID** | UC_2.3 |
| **Use Case Name** | Step 2: Capital Allocation Selection |
| **Use Case Description** | This use case allows the User to select one of three Evaluation Package tiers, in order to determine their starting notional capital, evaluation targets, and career-ladder entry point. |
| **Actor(s)** | User |
| **Pre-Condition(s)** | `asset_class` in session state. `/system/status` pricing data in global checkout state. |
| **Trigger** | User clicks [Next] at Step 1 with an asset class selected. |
| **Post-Condition(s)** | `product_id` (EVAL_L1/L2/L5) stored in session state. User proceeds to Step 3. |
| **Basic Flow** | 1. Step 2 renders 3 pricing cards (Advanced, Accelerated, Associate). 2. User clicks a card (or [Select Track] button) to select. 3. User clicks [Next]. |
| **List Screen** | Step 2 (Capital Allocation Selection) |
| **Exception Flow** | N/A |

### 2. ACTIVITY FLOW

```
flowchart TD
    subgraph User
        A([Start: Arrive at Step 2]) --> B[View 3 pricing cards]
        B --> C{Founder mode?}
        C -- Yes --> D[See strikethrough Standard price<br/>+ Founder price]
        C -- No --> E[See Standard price<br/>+ one-time label]
        D --> F[Click a card or Select Track]
        E --> F
        F --> G[Click Next]
    end

    subgraph System
        H[Store product_id<br/>EVAL_L1 / EVAL_L2 / EVAL_L5]
        I([Proceed to Step 3])
    end

    F --> H
    G --> I
```

> **Note (source doc, new):** `Daily Loss Limit` (`Daily_Loss_Ratio × max_drawdown`) is a backend/ops metric — it is **NOT displayed** in the Step 2 checkout UI. `Daily_Loss_Ratio` is read from Table C at runtime but never surfaced to the user at this step.

### 3. EVALUATION PACKAGE DATA (reference)

| Parameter | Advanced (EVAL_L5) | Accelerated (EVAL_L2) | Associate (EVAL_L1) |
|---|---|---|---|
| Standard Price | $7,000 | $1,250 | $650 |
| Founder Price | $5,599 | $1,049 | $499 |
| Status Ribbon | Recommended for Pros | Best Value | Foundation |
| Eval Req. — Futures | 7 ES | 16 Micros | 8 Micros |
| Eval Req. — Forex | $150,000 Notional | $50,000 Notional | $25,000 Notional |
| Target/Stop | 14% / 7.5%, 60 days (dynamic %, fixed days) | same | same |
| Career Entry | Level 5 | Level 2 | Level 1 |
| Distance to W2 | 1 Promotion Away | 4 Promotions Away | 5 Promotions Away |
| Live Stop Loss | $10,500 | $2,500 | $1,250 |
| Live Profit Target | $14,100 | $3,750 | $1,875 |

### 4. SCREEN DESCRIPTION

| # | Component | Type | Required? | Description |
|---|---|---|---|---|
| 1 | Pricing Card ×3 — Top | Radio Group | Yes | **Description:** Selects the Evaluation Package tier. **Displaying Rules:** 3 cards left-to-right: Advanced · Accelerated · Associate. Each shows: Status Ribbon, Track name, Price block, Evaluation Requirements box, [Select Track] button. Standard mode: Standard Price + "one-time". Founder mode: Standard Price (strikethrough) + Founder Price (full size), no "one-time" label. Evaluation Requirements box row 2 renders `"{target}% Target / {stop}% Stop, 60 days"` dynamically from Table C (not static string) [CHR-49]. No card pre-selected by default. **Behaviour Rules:** Click anywhere on card OR [Select Track] → selects tier, stores `product_id`, deselects previous card. **Validation Rules:** N/A. |
| 2 | Pricing Card ×3 — Bottom | Static Display | N/A | **Description:** Shows the Live Account & Career Path preview upon passing. **Displaying Rules:** Always visible, not collapsible. Header: *"Live Account & Career Path (Upon Passing)"*. Fields: Career Ladder Entry, Distance to W2 (1/4/5 Promotions Away), Live Capital Allocation, Live Stop Loss (with "Firm takes 100% of the risk" + tooltip), Live Profit Target. |
| 3 | Live Stop Loss — Tooltip ⓘ | Tooltip | N/A | **Description:** Explains firm-absorbed risk. **Behaviour Rules:** On hover → shows: *"If you pass the evaluation, the firm backs your account with this exact amount of real capital at risk. We absorb the losses so you can focus on execution."* |
| 4 | [Select Track] | Button (Secondary) | N/A | **Description:** Per-card select button. **Behaviour Rules:** Equivalent to clicking card body. |
| 5 | [Back] | Button (Secondary) | N/A | **Behaviour Rules:** Navigates back to Step 1. |
| 6 | [Next] | Button (Primary) | N/A | **Validation Rules:** Disabled until a card is selected. **Behaviour Rules:** On click → navigate to Step 3. |

### 5. BUSINESS RULES

| # | BR Code | Function | Description |
|---|---|---|---|
| 1 | BR_2.3.1 | Pricing Mode — Standard vs Founder | `is_founder_cohort=TRUE` → strikethrough Standard + full-size Founder, no "one-time" label. `FALSE` → Standard price + "one-time" label. |
| 2 | BR_2.3.2 | Card Selection | Only one card selectable at a time; new selection deselects previous. [Next] disabled until a card is selected. |

### 6. MESSAGE LIST

N/A — no error/toast messages in this UC.

---
---

# STEP 3 — PLATFORM SELECTION

## UC_2.4 — Platform Selection

### 1. USE CASE SPECIFICATION TABLE

| Field | Content |
|---|---|
| **Use Case ID** | UC_2.4 |
| **Use Case Name** | Step 3: Platform Selection |
| **Use Case Description** | This use case allows the User to select their preferred trading platform from a list dynamically filtered by asset class, in order to determine which execution gateway (Rithmic / MT5 / TraderEvolution) their evaluation account is provisioned on. |
| **Actor(s)** | User |
| **Pre-Condition(s)** | `asset_class` in session state. |
| **Trigger** | User clicks [Next] at Step 2 with a package selected. |
| **Post-Condition(s)** | `platform` stored in session state. User proceeds to Step 4 (Futures) or Step 5 (Forex). |
| **Basic Flow** | 1. Step 3 renders. 2. Frontend calls `GET /public/platform-options?asset_class=[asset_class]`. 3. Platform options render as logo tiles. 4. User clicks a tile → stored. 5. User clicks [Next]. |
| **List Screen** | Step 3 (Platform Selection) |
| **Exception Flow** | E1 — Empty array returned: Ref OV-01. E2 — HTTP 500/timeout: Ref FP-03. |

### 2. ACTIVITY FLOW

```
flowchart TD
    subgraph User
        A([Start: Arrive at Step 3])
        E[Click a platform tile]
        F[Click Next]
    end

    subgraph System
        B[Call GET /public/platform-options?asset_class=X]
        C{Response?}
        D1[Render OV-01<br/>No platforms available]
        D2[Render FP-03<br/>Full-page error]
        D3[Render platform tiles<br/>1 result: auto pre-select]
        G[Store platform in session state]
        H([Proceed to Step 4 - Futures<br/>or Step 5 - Forex])
    end

    A --> B --> C
    C -- Empty array --> D1
    C -- HTTP 500 / timeout --> D2
    C -- Non-empty --> D3 --> E --> G
    G --> F --> H
```

### 3. PLATFORM REGISTRY (Zapier Table I — snapshot)

| Platform Name | Asset Class | Gateway | Is_Active | Risk_Group_Template *(new)* |
|---|---|---|---|---|
| **TradeSea** (was NinjaTrader 8) | Futures | Rithmic | TRUE | Sim_Rithmic_Default |
| Quantower | Futures | Rithmic | TRUE | Sim_Rithmic_Default |
| ATAS | Futures | Rithmic | TRUE | Sim_Rithmic_Default |
| MotiveWave | Futures | Rithmic | TRUE | Sim_Rithmic_Default |
| Sierra Chart | Futures | Rithmic | TRUE | Sim_Rithmic_Default |
| MetaTrader 5 | Forex | MT5 | TRUE | Sim_MT5_Default |
| TradingView | Forex | TraderEvolution | TRUE | Sim_TV_Default |

### 4. SCREEN DESCRIPTION

| # | Component | Type | Required? | Description |
|---|---|---|---|---|
| 1 | Platform Tiles | Radio Group | Yes | **Description:** Logo-driven platform selector. **Displaying Rules:** API returns only `Platform_Name` strings — no logo/icon in response; FE maps each name to a local static logo asset (Ref BR_2.4.1). Default unselected, unless only 1 option returned → auto pre-selected (Ref BR_2.4.2, still requires [Next] click, no auto-advance). **Behaviour Rules:** On click → select tile, deselect previous, store `platform`. **Validation Rules:** N/A. |
| 2 | [Back] | Button (Secondary) | N/A | **Behaviour Rules:** Navigate back to Step 2. |
| 3 | [Next] | Button (Primary) | N/A | **Behaviour Rules:** Disabled until a tile is selected. On click → navigate to Step 4 (Futures) or Step 5 (Forex). |

### 5. BUSINESS RULES

| # | BR Code | Function | Description |
|---|---|---|---|
| 1 | BR_2.4.1 | Dynamic List — No Hardcoding | Options fetched from `GET /public/platform-options?asset_class=X`. Response is only `{ "platforms": [string] }` — no icon field. Logos are static FE assets mapped by name. |
| 2 | BR_2.4.2 | Pre-selection with 1 Result | 1 platform returned → auto pre-select (highlighted). User must still click [Next] — no auto-advance. |
| 3 | BR_2.4.3 | Navigation — Back from Later Steps | Changing platform via back-navigation from Step 5 does NOT reset Step 4 (Market Data) or Step 5 data — independent. |

### 6. MESSAGE LIST

| # | Message Code | Type | Message (EN) | Message (VN) | Trigger |
|---|---|---|---|---|---|
| 1 | OV-01 | Alert (Popup) | (Cần xác nhận: exact wording) | (Cần xác nhận) | `GET /public/platform-options` returns empty array |
| 2 | FP-03 | Error (Full-page) | (Cần xác nhận: exact wording) | (Cần xác nhận) | HTTP 500 or network timeout |

---
---

# STEP 4 — MARKET DATA SELECTION (FUTURES ONLY)

## UC_2.5 — Market Data Selection

### 1. USE CASE SPECIFICATION TABLE

| Field | Content |
|---|---|
| **Use Case ID** | UC_2.5 |
| **Use Case Name** | Step 4: Market Data Selection (Futures Only) |
| **Use Case Description** | This use case allows the Futures User to select additional market data feed subscriptions beyond the mandatory CME feed, in order to enable trading on the corresponding exchanges during evaluation. |
| **Actor(s)** | User |
| **Pre-Condition(s)** | `asset_class == 'FUTURES'`. `GET /public/market-data-products` returns a non-empty array. |
| **Trigger** | User clicks [Next] at Step 3 AND `asset_class == 'FUTURES'`. |
| **Post-Condition(s)** | `addon_ids[]` stored in session state. User proceeds to Step 5. |
| **Basic Flow** | 1. Step 4 renders. 2. Frontend calls `GET /public/market-data-products` (backend reads product list + prices from Table C — never hardcoded, Ref BR_2.5.5). 3. Toggle grid renders. 4. CME: pre-checked, locked. 5. User toggles optional feeds (NYMEX/CBOT/COMEX). 6. All selected feeds show `"Cost: $0.00 (Covered by Stack Trading)"`. 7. User clicks [Next]. |
| **List Screen** | Step 4 (Market Data Selection) — Forex users skip this step entirely |
| **Exception Flow** | E1 — 0 products returned: Ref FP-03, treated as system error. |

### 2. ACTIVITY FLOW

```
flowchart TD
    subgraph User
        A([Start: Arrive at Step 4<br/>only if asset_class=FUTURES])
        D[Toggle NYMEX/CBOT/COMEX<br/>optional feeds]
        E[Click Next]
    end

    subgraph System
        B[Call GET /public/market-data-products<br/>reads from Zapier Table C]
        C{0 products returned?}
        C1[Render FP-03<br/>treated as system error]
        C2[Render grid<br/>CME pre-checked + locked]
        F[Store addon_ids array<br/>in session state]
        G([Proceed to Step 5])
    end

    A --> B --> C
    C -- Yes --> C1
    C -- No --> C2 --> D --> E --> F --> G
```

### 3. SCREEN DESCRIPTION

| # | Component | Type | Required? | Description |
|---|---|---|---|---|
| 1 | CME Feed | Toggle/Switch | Yes (locked) | **Description:** Mandatory base data feed. **Displaying Rules:** ON label *"CME Level 2"*. Default ON, "Most Popular" badge. **Behaviour Rules:** Always ON, non-toggleable — always included in `addon_ids[]` (Ref BR_2.5.1). |
| 2 | Optional Feeds (NYMEX/CBOT/COMEX) | Toggle/Switch ×3 | No | **Description:** Additional exchange feeds. **Displaying Rules:** Default OFF for all. Cost display: *"Cost: $0.00 (Covered by Stack Trading)"* (Ref BR_2.5.3). **Behaviour Rules:** Toggle ON → add to `addon_ids[]`; OFF → remove. Selections preserved on back-navigation (Ref BR_2.5.4). |
| 3 | Market Data Lifecycle Disclosure | Static Text | N/A | **Displaying Rules:** Static, non-collapsible, always visible, below the feed grid. **Verbatim text (confirmed from source doc, v31):** Line 1: *"Associate Track Evaluation: The Firm pays 100% of data costs."* Line 2: *"Level 1 and 2: The Trader pays (Standard Exchange Professional Data rates apply)."* Line 3: *"Level 3: The Trader is fully reimbursed for all Base CME market data costs incurred during Levels 1 and 2."* (Note: reimbursement is scoped specifically to **Base CME** costs, not all data costs — this is more precise than earlier drafts.) Line 4: *"Level 3 to Level 24: The Firm covers 100% of Base CME data costs."* |
| 4 | [Back] | Button (Secondary) | N/A | **Behaviour Rules:** Navigate back to Step 3. |
| 5 | [Next] | Button (Primary) | N/A | **Behaviour Rules:** Always enabled (CME always selected). On click → store final `addon_ids[]`, navigate to Step 5. |

### 4. BUSINESS RULES

| # | BR Code | Function | Description |
|---|---|---|---|
| 1 | BR_2.5.1 | CME Locked ON | Pre-checked and locked ON by default — cannot be unchecked. |
| 2 | BR_2.5.2 | Optional Feed Defaults | NYMEX, CBOT, COMEX default to OFF. |
| 3 | BR_2.5.3 | Cost Display | All selected options show `"Cost: $0.00 (Covered by Stack Trading)"`. Downstream billing (Flow 22 — Monthly Data Fee Billing) is not surfaced here. |
| 4 | BR_2.5.4 | Navigation — Back from Later Steps | Previously selected `addon_ids[]` states preserved on return to Step 4 — not reset to default. |
| 5 | BR_2.5.5 | Product & Price Source — Table C (No Hardcoding) | `GET /public/market-data-products` MUST read product list + prices from Zapier Table C at request time. Backend must NOT hardcode. Applies also to the authenticated Dashboard variant (`GET /market-data-products`), which additionally filters out already-owned feeds. |

### 5. MESSAGE LIST

| # | Message Code | Type | Message (EN) | Message (VN) | Trigger |
|---|---|---|---|---|---|
| 1 | FP-03 | Error (Full-page) | (Cần xác nhận: exact wording) | (Cần xác nhận) | `GET /public/market-data-products` returns 0 products |

---
---

# STEP 5 — PII CAPTURE, COMPLIANCE & CART ABANDONMENT

## UC_2.6.1 — PII Capture & Compliance

### 1. USE CASE SPECIFICATION TABLE

| Field | Content |
|---|---|
| **Use Case ID** | UC_2.6.1 |
| **Use Case Name** | Step 5: PII Capture & Compliance |
| **Use Case Description** | This use case allows the User to submit personal and billing information, complete flow-dependent compliance checkboxes, and trigger tax calculation, in order to move to the checkout/payment step with a validated, sanctions-cleared, tax-calculated order. |
| **Actor(s)** | User, Quaderno, Google Places/Address Validation API, Everflow |
| **Pre-Condition(s)** | Session state has `asset_class`, `product_id`, `platform`, `addon_ids[]` (empty array `[]` for Forex path). `required_flow` available in global state. |
| **Trigger** | User clicks [Next] at Step 4 (Futures) or Step 3 (Forex). |
| **Post-Condition(s)** | PII validated. `POST /calculate-cart` returned HTTP 200 (Sanctions Gate passed). All required checkboxes checked. User can proceed to Step 6. |
| **Basic Flow** | See Detailed 10-step flow below (§2). |
| **List Screen** | Step 5 (PII Capture & Compliance) — 7 flow-specific wireframe variants (A, B×2, C×2, D, E, G) |
| **Exception Flow** | E1 — Blocked jurisdiction selected: Ref IN-01, placement varies by whether whole-country or specific-region match; Next stays disabled until valid selection made. E2 — `/calculate-cart` HTTP 5xx: Ref FP-03. |

### 2. DETAILED BASIC FLOW

1. Step 5 renders all PII fields. Flow-dependent compliance UI renders simultaneously (per UC_2.1.2).
2. Current UTM values read from `localStorage` (Ref CR-12 / BR_2.1.1.4) — not re-parsed from URL here.
3. User fills fields. Email `onBlur` → triggers UC_2.6.2 Phase 1 (Capture Lead), independently of this flow.
4. **Google Places Autocomplete [CHR-87]:** typing in Billing Address suggests a dropdown; selecting an entry auto-populates Billing Address, ZIP, and attempts to match Country/State/City dropdowns. Overwrites any existing values in those fields. If auto-selected Country is blocked → IN-01 fires immediately per step 7.
5. User selects Country. State/Region, City, ZIP fields visible on load — City starts disabled (no Region yet). On Country selection: hide State/Region if country has none → also hide City (`[CHR-90]`); hide ZIP if `zip_requirements[country] = false`.
6. User selects State/Region. Frontend clears existing City selection, fetches City list scoped to Region (`[CHR-90]`). No city data → City stays hidden; otherwise enabled with fetched options.
7. Sanctions pre-check (Ref BR_2.6.1.1 mechanism 1): on every Country/State selection — blocked → IN-01 immediately, Region/ZIP disabled per placement rule (BR_2.6.1.9); not blocked → no warning.
8. User checks all required compliance checkboxes + fills remaining fields.
9. User clicks [Next] → `POST /calculate-cart` fires (Ref BR_2.6.1.1 mechanism 2). Payload: `product_id, addon_ids, billing_country, billing_region, billing_city [CHR-87], user_ip, user_id, promo_code (NULL), zip_code (conditional)`. "Calculating regional taxes..." shown below State/Region dropdown; [Next] disabled during call. Backend processes 6 steps in order: **(1) Sanctions Gate** → 403 if matched, skips 2–6. **(2) Pricing Engine** → Table J lookup, Founder Price if cohort open, returning-user branch [CHR-38], market data entitlement check [CHR-65]. **(3) Location Check** → N/A at Step 5 (billing_country always user-supplied here). **(4) Address Validation Gate [CHR-87]** → US/CA only, rate-limited 15 req/min + 24h cache; mismatch → HTTP 400 (Ref IN-12), skips 5–6; all other countries bypass this gate entirely. **(5) Tax Engine** → Quaderno API call with running amount from step 2. **(6) Return** → `{ base_price, discount_amount, tax_amount, total_price }`, saved silently to session state — nothing rendered at Step 5 (Ref BR_2.6.1.5). FX fields added for T365 [CHR-68].
10. On HTTP 200 → "Calculating..." text disappears, triggers UC_2.6.2 Phase 2 (full PII UPSERT), navigates to Step 6. No price/tax shown at Step 5.

### 3. ACTIVITY FLOW

```
flowchart TD
    subgraph User
        A([Start: Arrive at Step 5])
        B[Fill PII fields]
        C[Select Country]
        D[Select State/Region]
        E[Check compliance boxes]
        F[Click Next]
    end

    subgraph System
        G{Country blocked?}
        G1[Show IN-01 under Country<br/>disable State + ZIP<br/>Next stays disabled]
        H{State/Region blocked?}
        H1[Show IN-01 under State<br/>disable ZIP<br/>Next stays disabled]
        I[Call POST /calculate-cart]
        J[Backend: Sanctions Gate]
        K{Sanctions match?}
        K1[Return HTTP 403<br/>Show IN-01<br/>skip remaining steps]
        L[Pricing Engine]
        M[Address Validation Gate<br/>US/CA only, CHR-87]
        N{Address mismatch?}
        N1[Return HTTP 400<br/>Show IN-12]
        O[Tax Engine - Quaderno]
        P[Return base/discount/tax/total<br/>saved silently, not displayed]
        Q[Trigger UC_2.6.2 Phase 2<br/>full PII UPSERT]
        R([Proceed to Step 6])
    end

    A --> B --> C --> G
    G -- Yes --> G1
    G -- No --> D --> H
    H -- Yes --> H1
    H -- No --> E --> F --> I --> J --> K
    K -- Yes --> K1
    K -- No --> L --> M --> N
    N -- Yes --> N1
    N -- No --> O --> P --> Q --> R
```

### 4. SCREEN DESCRIPTION

| # | Component | Type | Required? | Description |
|---|---|---|---|---|
| 1 | First Name / Last Name | Text Input | Yes | **Description:** Legal name capture. **Validation Rules:** Required. (Cần xác nhận: max length / special-char rules — likely CR-02 generic text field rule.) |
| 2 | Email | Text Input | Yes | **Description:** Primary identifier and cart-abandonment trigger. **Behaviour Rules:** `onBlur` → triggers `POST /capture-lead` (UC_2.6.2 Phase 1). **Validation Rules:** Required, format per CR-09. |
| 3 | Confirm Email | Text Input | Yes | **Validation Rules:** Must match Email field exactly (Ref BR_2.6.1.2 condition 4). Does not trigger `/calculate-cart` on change (Ref BR_2.6.1.7). |
| 4 | Billing Address | Text Input w/ Autocomplete | Yes | **Description:** Street address with Google Places Autocomplete. **Behaviour Rules:** Selecting a suggestion auto-fills ZIP + attempts to match Country/State/City dropdowns (Ref BR_2.6.1.11, `[CHR-87]`). Manual typing without selecting a suggestion does NOT auto-fill other fields. |
| 5 | Country | Dropdown | Yes | **Behaviour Rules:** Sanctions pre-check fires immediately on selection (Ref BR_2.6.1.1). Hides State/Region if country has none; hides City consequently (`[CHR-90]`); hides ZIP if not required for this country. |
| 6 | State / Province / Region | Dropdown | Conditional | **Displaying Rules:** Hidden if selected country has no regions. **Behaviour Rules:** Sanctions pre-check fires on selection. Clears + re-fetches City options scoped to this region (`[CHR-90]`). |
| 7 | City | Dropdown | Conditional | **Displaying Rules:** Disabled until Region selected; hidden if Region has no city data. **Behaviour Rules:** Cascades from State/Region selection (`[CHR-90]`). |
| 8 | ZIP / Postal Code | Text Input | Conditional | **Displaying Rules:** Shown/hidden per `zip_requirements[billing_country]` map from Step 0 (`[CHR-6]`). |
| 9 | Shirt Size | Dropdown | Yes | **Displaying Rules:** Options: S, M, L, XL, XXL. |
| 10 | Compliance Checkboxes (2 or 3, flow-dependent) | Checkbox | Yes | See UC_2.1.2 §3 for exact text and per-flow variants. |
| 11 | "Calculating regional taxes..." | Static Text | N/A | **Displaying Rules:** Shown below State/Region dropdown only while `POST /calculate-cart` is in flight. |
| 12 | [Back] | Button (Secondary) | N/A | **Behaviour Rules:** Navigate back to Step 4/Step 3. |
| 13 | [Next] | Button (Primary) | N/A | **Validation Rules (Ref BR_2.6.1.2):** Disabled until: (1) all required fields valid, (2) no unresolved Sanctions pre-check match, (3) all required checkboxes checked, (4) Confirm Email matches Email. **Behaviour Rules:** On click → fires `POST /calculate-cart`; stays disabled during call; navigates to Step 6 only on HTTP 200. |

### 5. BUSINESS RULES

| # | BR Code | Function | Description |
|---|---|---|---|
| 1 | BR_2.6.1.1 | Sanctions Pre-Check & Tax Calculation Timing `[CHR-47]` | Two independent mechanisms: (1) Immediate sanctions pre-check on every Country/State selection — no debounce; (2) Tax calculation call ONLY on [Next] click, never on field `onChange`/`onBlur` (except Email `onBlur` which triggers a separate lead-capture call, not this one). |
| 2 | BR_2.6.1.2 | Next Button Gate | 4 conditions must all be true simultaneously (see Screen Description row 13). On click, if met → fires `/calculate-cart`; navigation happens only on HTTP 200. |
| 3 | BR_2.6.1.3 | Everflow Cookie Capture | 2 parallel paths run on page init, always, regardless of SDK status: Path 1 = Everflow JS SDK captures affiliate params, stores `transaction_id` as first-party cookie. Path 2 = raw affiliate URL params parsed directly into `st_affiliate_data` cookie (not ad-blocker-dependent). If SDK fails to load: FE appends `everflow_sdk_blocked=true` + `st_affiliate_data` to `/execute-checkout` payload; backend generates `transaction_id` on-the-fly via Everflow S2S Click API. |
| 4 | BR_2.6.1.4 | Data Persistence on Back Navigation | Step 5 data preserved across back nav (same as BR_2.2.3). Reload behavior governed by BR_2.1.1.3. |
| 5 | BR_2.6.1.5 | No Price Display at Step 5 | `base_price/discount/tax/total` from `/calculate-cart` saved silently to session state — nothing rendered on this screen. First shown at Step 6 Order Summary. |
| 6 | BR_2.6.1.7 (referenced) | Email/Confirm Email do not trigger tax call | Changes to these two fields never trigger `POST /calculate-cart`. |
| 7 | BR_2.6.1.9 (referenced) | Field Disable Placement on Sanctions Match | Whole-country match → disables State/Region + ZIP. Specific-region match → disables ZIP only. |
| 8 | BR_2.6.1.11 (referenced) | Google Places Autocomplete Behavior | See detailed flow step 4 above. |
| 9 | `[CHR-38]` | Returning User Detection | If email matches an existing Users record with `status IN ('Failed','Terminated')`, pricing branches on `Post_Failure_Retention_Days` (Table C) × founder × professional status. (Cần xác nhận: exact branch matrix — not fully detailed in source doc excerpt available.) |
| 10 | `[CHR-65]` | Market Data Entitlement Check (Returning Users) | For Futures/Rithmic returning users, must check already-purchased market data before allowing new feed purchase. (Cần xác nhận: exact UI treatment at Step 5.) |
| 11 | `[CHR-90]` | City Cascades From Region | City dropdown always scoped to the selected State/Region; changing Region clears City selection and re-fetches options. |
| 12 | `[CHR-87]` | Address Validation Gate (US/CA only) | Rate-limited 15 req/min per user/session + 24h success cache per normalized State+City+ZIP. Mismatch on `administrative_area_level_1`/`locality`/`postal_code` → HTTP 400, request dropped before Tax Engine runs. All other countries bypass this gate — proceed straight to Tax Engine. |
| 13 | BR_2.6.1.12 *(newly confirmed to exist — content not retrievable)* | Address Validation API Error Cases (for AQA) | Source doc references a dedicated named subsection "Errors from Calling API (for AQA team)" listing the full set of Google Address Validation API error cases QC must test. **⚠️ Cần xác nhận:** content did not load in the fetch (page truncates at this point every time it's pulled) — open the source page directly in a browser and scroll to this anchor before finalizing AQA test cases. |
| 14 | BR_2.6.1.13 *(newly confirmed to exist — content not retrievable)* | Returning-User Pricing — Full Branch Matrix | Referenced by `[CHR-38]` (row 9 above) as the rule containing the complete branch logic for `Post_Failure_Retention_Days` × founder × professional status, plus "the resulting post-payment flow." **⚠️ Cần xác nhận:** same fetch limitation as above — this is a materially important rule (governs pricing for anyone re-purchasing after a failed/terminated account) and should be pulled directly from the browser, not left as a placeholder, before SRS sign-off. |
| 15 | BR_2.6.1.14 *(newly confirmed to exist — content not retrievable)* | Market Data Entitlement Check — UI Treatment | Referenced by `[CHR-65]` (row 10 above). **⚠️ Cần xác nhận:** same limitation — governs what a returning Futures/Rithmic user sees at Step 5 if they already own some market data feeds. |

**Wireframe references confirmed in source doc (v31)** — 8 named files exist for this step, confirming Step 5 has distinct comps per flow: `Step 5 Flow A.png`, `Step 5 Flow B_ Data available.png`, `Step 5 Flow B_ Launch state.png`, `Step 5 Flow C Data available.png`, `Step 5 Flow C Launch state.png`, `Step 5 Flow D.png` (Canada/French), `Step 5 Flow E.png` (UAE), `Step 5 Flow G.png` (India). No dedicated Flow H/I/J-specific comp is named in the doc — those 3 flows share the Flow A layout (2 standard checkboxes, no additional disclosure), so this is expected, not a gap.

### 6. MESSAGE LIST

| # | Message Code | Type | Message (EN) | Message (VN) | Trigger |
|---|---|---|---|---|---|
| 1 | IN-01 | Validation (Inline) | (Cần xác nhận: exact wording, e.g. "Stack Trading cannot accept clients from [Country]/[Region]") | (Cần xác nhận) | Blocked Country/Region selected (pre-check) or 403 from `/calculate-cart` |
| 2 | IN-12 | Validation (Inline) | (Cần xác nhận: exact wording — Address Validation mismatch) | (Cần xác nhận) | Google Address Validation flags mismatch (US/CA only) |
| 3 | FP-03 | Error (Full-page) | (Cần xác nhận: exact wording) | (Cần xác nhận) | `/calculate-cart` HTTP 5xx |

---

## UC_2.6.2 — Lead Capture & Cart Abandonment

### 1. USE CASE SPECIFICATION TABLE

| Field | Content |
|---|---|
| **Use Case ID** | UC_2.6.2 |
| **Use Case Name** | Step 5: Lead Capture & Cart Abandonment |
| **Use Case Description** | This use case allows the System to capture a partial lead the moment the user finishes typing their email, in order to enable cart-abandonment remarketing even if the user never completes checkout. |
| **Actor(s)** | System |
| **Pre-Condition(s)** | User is on Step 5. |
| **Trigger** | Phase 1: Email field `onBlur`. Phase 2: [Next] click succeeds at Step 5 (`/calculate-cart` HTTP 200). |
| **Post-Condition(s)** | Phase 1: Guest record created/updated + `Cart_Abandonment` webhook fired. Phase 2: full PII UPSERTed into the same record. No Auth0 account exists at either phase. |
| **Basic Flow** | Phase 1: Email `onBlur` → `POST /capture-lead` (email + UTM) → creates/updates Guest record, fires `Cart_Abandonment` webhook. Phase 2: [Next] click succeeds → UPSERT full PII into same Guest record → navigate to Step 6. |
| **List Screen** | N/A (silent background call within Step 5) |
| **Exception Flow** | (Cần xác nhận: behavior if `/capture-lead` itself fails — source doc does not specify a user-facing error state for this fire-and-forget call.) |

### 2. ACTIVITY FLOW

```
flowchart TD
    subgraph User
        A([User finishes typing Email]) --> B[Field loses focus - onBlur]
        F([User clicks Next<br/>at Step 5, later])
    end

    subgraph System
        C[POST /capture-lead<br/>Phase 1: email + UTM]
        D[Create/update Guest record]
        E[Fire Cart_Abandonment webhook]
        G[POST /calculate-cart succeeds]
        H[UPSERT full PII<br/>into same Guest record<br/>Phase 2]
        I([Navigate to Step 6])
    end

    B --> C --> D --> E
    F --> G --> H --> I
```

### 3. SCREEN DESCRIPTION

N/A — silent background operation, no dedicated screen elements beyond the Email field itself (documented in UC_2.6.1).

### 4. BUSINESS RULES

| # | BR Code | Function | Description |
|---|---|---|---|
| 1 | (Implicit) | Two-Phase Capture | Phase 1 (onBlur) captures minimal data early to survive drop-off; Phase 2 (Next success) enriches the same record with full PII — never creates a duplicate record. |
| 2 | (Implicit) | No Auth0 Account at Either Phase | A Guest record is a DB row only — no authentication account exists until Step 7 provisioning completes. |

### 5. MESSAGE LIST

N/A — background call, no user-facing message.

---
---

# STEP 6 — CHECKOUT & PAYMENT

## UC_2.7.1 — Order Summary

### 1. USE CASE SPECIFICATION TABLE

| Field | Content |
|---|---|
| **Use Case ID** | UC_2.7.1 |
| **Use Case Name** | Order Summary |
| **Use Case Description** | This use case allows the System to render the split-panel Step 6 checkout page, in order to present payment method selection alongside a persistent order summary without any additional API calls. |
| **Actor(s)** | User, System |
| **Pre-Condition(s)** | `/calculate-cart` succeeded at Step 5 (`total/tax/base_price` in state). `methods[]` loaded from Step 0. User passed Step 5 compliance gate. |
| **Trigger** | User navigates to Step 6 after Step 5. |
| **Post-Condition(s)** | Step 6 renders fully. First method in `methods[]` pre-selected. Matching execution environment renders. |
| **Basic Flow** | See Detailed Flow below (§2). |
| **List Screen** | Step 6 (Secure Checkout) |
| **Exception Flow** | E1 — `methods[]` empty: Ref OV-02, blocking popup, user cannot proceed. |

### 2. DETAILED BASIC FLOW

1. On mount, Step 6 always renders split-panel, headline *"Secure Checkout"*. If email is currently locked (5-Failure Lock, Ref BR_2.8.1.2) → Ref OV-03 renders on top, on every mount including forward nav and reload. **F5 note:** payment has no resumable mid-state — reload routes directly to correct final state, OV-05 never re-rendered.
2. System reads `methods[]` from session state (populated at Step 0). Each renders as radio + label + explanatory text + inline icons + CTA button.
3. First method auto-selected; DOM swap executes immediately.
4. FE applies client-side OS/browser detection for Apple Pay / Google Pay visibility (Ref BR_2.7.1.4).
5. User clicks CTA → 3 possible groups:
   - **Group A (CC only):** fills form directly on page, no modal.
   - **Group B (Apple Pay, Google Pay, Crypto):** 3rd-party modal opens. Case A = user closes before paying → no overlay. Case B = modal closed mid-payment → OV-05 renders, WS listener maintained. Case C = payment completes in modal → OV-05 → OV-06 → confirmation.
   - **Group C (Dusupay, T365):** full active-tab redirect to hosted page → Return URL → FP-06 "Verifying Your Payment..." → WS confirmation → OV-06 (2s) or BN-12/BN-01 banner + [Return to Payment page].

### 3. ACTIVITY FLOW

```
flowchart TD
    subgraph User
        A([Start: Arrive at Step 6]) --> B{methods empty?}
        F[Select payment method]
        G[Click CTA button]
    end

    subgraph System
        C[Render OV-02<br/>blocking popup]
        D[Read methods from state<br/>auto-select first method<br/>apply OS/browser detection]
        H{Method group?}
        I["Group A: CC<br/>fill form on page"]
        J["Group B: Apple Pay / Google Pay / Crypto<br/>open 3rd-party modal"]
        K["Group C: Dusupay / T365<br/>redirect active tab"]
        L([Proceed to UC_2.8.1<br/>Payment Execution])
    end

    A --> B
    B -- Yes --> C
    B -- No --> D --> F --> G --> H
    H -- A --> I --> L
    H -- B --> J --> L
    H -- C --> K --> L
```

### 4. SCREEN DESCRIPTION

| # | Component | Type | Required? | Description |
|---|---|---|---|---|
| 1 | Payment method radio list | Radio Group | Yes | **Displaying Rules:** Rendered dynamically from `methods[]`. Each row: radio + label + inline SVG icons (aggregator corporate logos excluded) + CTA. Apple Pay/Google Pay rendered only if OS/browser supports (Ref BR_2.7.1.4). **Behaviour Rules:** On click → DOM swap. Default: first method pre-selected. |
| 2 | `explanatory_text` block | Static Text | N/A | **Displaying Rules:** Renders selected method's `explanatory_text`; updates on selection change. |
| 3 | Order Summary — Selections | Static Text | N/A | **Displaying Rules:** 3 read-only lines: Asset Class / Platform / Market Data. Market Data line hidden for Forex. Truncate + tooltip on overflow. |
| 4 | Order Summary — Financials | Static Text | N/A | **Displaying Rules:** `[Tier] Evaluation Price / Tax / Total / Discount` — values from `calculate-cart` response, displayed exactly as returned (Ref CR-11). No hover tooltip. |
| 5 | Value Reinforcement Block | Static Text | N/A | **Displaying Rules:** 3 green checkmark items: "Instant Platform Credentials" / "Zero Trailing Drawdowns & No Consistency Rules" / "One-Time Fee". |
| 6 | "Have a promo code?" | Text Link / Button | N/A | **Behaviour Rules:** Expands promo section; state preserved on collapse/re-expand. See UC_2.7.8. |
| 7 | Trust Anchors | Static Display | N/A | **Displaying Rules:** 256-bit SSL icon, PCI-DSS badge, payment logos. No interaction. |
| 8 | [Back] | Button (Secondary) | N/A | **Behaviour Rules:** Navigate back to Step 5. |

### 5. BUSINESS RULES

| # | BR Code | Function | Description |
|---|---|---|---|
| 1 | BR_2.7.1.1 | Data Source at Step 6 | `methods[]` read from Step 0 state — no re-query. Initial pricing read from Step 5 `/calculate-cart` state — no re-query on load. `/calculate-cart` IS re-called at Step 6 only when a promo code is applied. |
| 2 | BR_2.7.1.3 | Payment Method List Is Dynamic | Never hardcoded. Built server-side at Step 0 §3d from `Payment_Method_Config` (GLOBAL + country-specific merge, minus backend exclusion rules e.g. India strips CC/Apple Pay/Google Pay). |
| 3 | BR_2.7.1.4 | Apple Pay / Google Pay — Client-Side Detection | Included in `methods[]` globally, but FE only renders them if client environment supports (Apple device/Safari for Apple Pay; Android/Chrome for Google Pay). Not rendered if unsupported, even though present in array. |

### 6. MESSAGE LIST

| # | Message Code | Type | Message (EN) | Message (VN) | Trigger |
|---|---|---|---|---|---|
| 1 | OV-02 | Alert (Popup, blocking) | (Cần xác nhận: exact wording) | (Cần xác nhận) | `methods[]` is empty |
| 2 | OV-03 | Alert (Popup) | (Cần xác nhận: exact wording — email-locked state) | (Cần xác nhận) | Email currently under 5-failure lock |
| 3 | OV-05 | Alert (Popup, processing) | "Please do not refresh the page or click the back button. This may take a few moments." (per RFQ source; confirm current copy) | (Cần xác nhận) | Payment processing overlay |
| 4 | OV-06 | Alert (Popup, success) | (Cần xác nhận: exact wording — "Payment Successful") | (Cần xác nhận) | Payment succeeds |

---

## UC_2.7.2 — Credit Card (NMI Collect.js)

### 1. USE CASE SPECIFICATION TABLE

| Field | Content |
|---|---|
| **Use Case ID** | UC_2.7.2 |
| **Use Case Name** | Credit Card (NMI Collect.js) |
| **Use Case Description** | This use case allows the User to pay via Credit/Debit Card using NMI-hosted PCI-compliant iframes, in order to complete the evaluation purchase without Stack Trading ever handling raw card data. |
| **Actor(s)** | User, NMI |
| **Pre-Condition(s)** | `CC` method selected. NMI Collect.js hosted fields injected successfully. Name, Card Number, Expiration, CVC filled. |
| **Trigger** | User clicks CTA button after filling CC form. |
| **Post-Condition(s)** | HTTP 200 → OV-06 → auto-transitions to UC_2.8.1. Declined → failure banner with raw NMI decline reason (not rewritten). |
| **Basic Flow** | 1. User clicks CTA. 2. FE fires `POST /capture-lead` (fire-and-forget) updating `abandoned_step`. 3. NMI Collect.js tokenizes card server-side → `payment_token`. 4. Process transitions to UC_2.8.1 for payload assembly + execution. |
| **List Screen** | Step 6 — Credit Card DOM state |
| **Exception Flow** | See UC_2.8.1 §5 step 8 for decline handling. |

### 2. ACTIVITY FLOW

```
flowchart TD
    subgraph User
        A([Select Credit Card]) --> B[Fill Name / Card / Exp / CVC]
        B --> C[Click CTA button]
    end

    subgraph System
        D[Fire POST /capture-lead<br/>fire-and-forget]
        E[NMI Collect.js tokenizes<br/>card data server-side]
        F([Transition to UC_2.8.1<br/>Payment Execution])
    end

    C --> D --> E --> F
```

### 3. SCREEN DESCRIPTION

| # | Component | Type | Required? | Description |
|---|---|---|---|---|
| 1 | Name on card | Text Input | Yes | **Validation Rules:** PCI-compliant, handled by NMI. Custom HTML input forbidden for the 3 fields below (not this one specifically — see BR_2.7.2.1). |
| 2 | Card Number | NMI Collect.js iframe | Yes | **Validation Rules:** PCI-compliant, handled entirely by NMI hosted iframe. Custom HTML input strictly forbidden. |
| 3 | Expiration (MM/YY) | NMI Collect.js iframe | Yes | Same as above. |
| 4 | CVC | NMI Collect.js iframe | Yes | Same as above. |

### 4. BUSINESS RULES

| # | BR Code | Function | Description |
|---|---|---|---|
| 1 | BR_2.7.2.1 | NMI Collect.js Required — Custom Inputs Forbidden | Card Number, Expiration, CVC MUST use NMI Collect.js hosted iframes. Custom HTML inputs strictly forbidden (PCI DSS). |
| 2 | BR_2.7.2.2 | Lead Capture | `POST /capture-lead` fires on CTA click to update abandoned-step record. Does NOT block payment execution — `/execute-checkout` proceeds regardless of outcome. |

### 5. MESSAGE LIST

N/A — decline messaging is centralized in UC_2.8.1 (raw gateway message, not rewritten here).

---

## UC_2.7.3 — Apple Pay

### 1. USE CASE SPECIFICATION TABLE

| Field | Content |
|---|---|
| **Use Case ID** | UC_2.7.3 |
| **Use Case Name** | Apple Pay |
| **Use Case Description** | This use case allows the User to pay via the native Apple Pay wallet sheet (iOS Safari / macOS Safari), in order to complete purchase with biometric authentication instead of manual card entry. |
| **Actor(s)** | User, NMI (Apple Pay integration) |
| **Pre-Condition(s)** | Apple Pay visible per BR_2.7.1.4 (Apple device/Safari). |
| **Trigger** | User clicks CTA button with Apple Pay selected. |
| **Post-Condition(s)** | Case C (success) → OV-05 → OV-06 → UC_2.8.1. Case A (cancel) → no overlay. Failure → UC_2.8.1 §5 step 8. |
| **Basic Flow** | 1. User clicks CTA. 2. FE fires `POST /capture-lead` fire-and-forget. 3. NMI invokes native Apple Pay sheet (3rd-party modal). 4. Outcome per case table below. |
| **List Screen** | Step 6 — Apple Pay wallet sheet (native, not a Stack Trading screen) |
| **Exception Flow** | See case table below. |

### 2. CASE TABLE

| Case | Trigger | Result |
|---|---|---|
| A | User dismisses sheet before authenticating | Sheet closes → CTA returns to normal state. No overlay. |
| B | N/A | Apple Pay auth is atomic — no mid-authentication close state exists. |
| C | User authenticates, payment completes | Sheet closes → OV-05 → `PAYMENT_RESULT=success` → OV-06 → UC_2.8.1. |
| Failure | `PAYMENT_RESULT=failure` | Overlay removed → UC_2.8.1 §5 step 8. Failure banner = raw Apple Pay/NMI response, not rewritten. |

### 3. ACTIVITY FLOW

```
flowchart TD
    subgraph User
        A([Select Apple Pay]) --> B[Click CTA]
    end

    subgraph System
        C[Fire POST /capture-lead]
        D[Invoke native Apple Pay sheet]
        E{User action?}
        F[Case A: Sheet closes<br/>no overlay]
        G[OV-05 renders]
        H{PAYMENT_RESULT?}
        I[OV-06 -> UC_2.8.1]
        J[UC_2.8.1 step 8<br/>raw failure banner]
    end

    B --> C --> D --> E
    E -- Dismiss before auth --> F
    E -- Authenticate --> G --> H
    H -- success --> I
    H -- failure --> J
```

### 4. SCREEN DESCRIPTION

N/A — wallet sheet is native Apple UI, not a Stack Trading-designed screen. See Screen Description for surrounding Step 6 context in UC_2.7.1.

### 5. BUSINESS RULES

N/A feature-specific — governed entirely by BR_2.7.1.4 (visibility) and UC_2.8.1 (execution/failure handling).

### 6. MESSAGE LIST

N/A — see UC_2.8.1 for failure banner handling (raw provider message, no dedicated code).

---

## UC_2.7.4 — Google Pay

### 1. USE CASE SPECIFICATION TABLE

| Field | Content |
|---|---|
| **Use Case ID** | UC_2.7.4 |
| **Use Case Name** | Google Pay |
| **Use Case Description** | This use case allows the User to pay via the native Google Pay wallet sheet (Android Chrome / Chrome desktop), in order to complete purchase with device authentication instead of manual card entry. |
| **Actor(s)** | User, NMI (Google Pay integration) |
| **Pre-Condition(s)** | Google Pay visible per BR_2.7.1.4 (Android/Chrome). |
| **Trigger** | User clicks CTA button with Google Pay selected. |
| **Post-Condition(s)** | Identical pattern to UC_2.7.3 (Apple Pay) — Case C success → OV-05 → OV-06 → UC_2.8.1; Case A cancel → no overlay; failure → UC_2.8.1 §5 step 8. |
| **Basic Flow** | Identical structure to UC_2.7.3, substituting Google Pay's native wallet sheet (hosted by Google) for Apple's. |
| **List Screen** | Step 6 — Google Pay wallet sheet (native) |
| **Exception Flow** | Same case table pattern as UC_2.7.3 — Case B N/A (atomic device auth: biometrics/PIN). |

### 2. ACTIVITY FLOW

Identical structure to UC_2.7.3 — see that diagram, substituting "Google Pay sheet" for "Apple Pay sheet".

### 3. SCREEN DESCRIPTION

N/A — native Google UI, not a Stack Trading-designed screen.

### 4. BUSINESS RULES

N/A feature-specific — governed by BR_2.7.1.4 and UC_2.8.1.

### 5. MESSAGE LIST

N/A — see UC_2.8.1.

---

## UC_2.7.5 — Crypto (Triple-A) *(pending removal — CR-20260810-001)*

### 1. USE CASE SPECIFICATION TABLE

| Field | Content |
|---|---|
| **Use Case ID** | UC_2.7.5 |
| **Use Case Name** | Crypto (Triple-A) |
| **Use Case Description** | This use case allows the User to pay with cryptocurrency via a Triple-A-hosted 2-modal flow, in order to complete purchase using BTC/USDT/ETH etc. within a guaranteed-rate 25-minute window. **⚠️ Status: pending removal — confirm with BAL before investing further design effort.** |
| **Actor(s)** | User, Triple-A |
| **Pre-Condition(s)** | `TRIPLE_A` method available in `methods[]` for user's country. User is on Step 6. |
| **Trigger** | User selects "Pay with Crypto" and clicks CTA. |
| **Post-Condition(s)** | Success (not expired) → UC_2.8.1 §5 step 7b. Timer expired → State C (modal stays open). Failure → UC_2.8.1 §5 step 8. |
| **Basic Flow** | See Detailed Flow below (§2). |
| **List Screen** | Step 6 — Modal 1 (Currency Selection), Modal 2 (Payment Details: State B QR / State C Expired / Payment Confirmed) |
| **Exception Flow** | E1 — Unsupported token selected: toast error (raw Triple-A message), dropdown stays open. E2 — Timer expires: State C, [Reload] fetches new rate, re-enters State B, modal never closes. E3 — Modal closed before any action: closes cleanly, no listener held open. E4 — Modal closed mid-payment: WS listener survives close (Ref BR_2.7.5.3), OV-05 renders over restored Step 6. E5 — Modal closed after success already received: no-op, already transitioned. |

### 2. DETAILED BASIC FLOW

1. User clicks CTA. FE fires `POST /capture-lead`, updates `abandoned_step`.
2. Modal 1 (Currency Selection) opens — dropdown populated dynamically from `Payment_Method_Config.icon_tags[]` for `TRIPLE_A` (Ref BR_2.7.5.4 — never hardcoded).
3. User selects a cryptocurrency.
4. Modal 1 closes; Modal 2 (Payment Details, State B) opens: Amount, Wallet address, QR code, 25-min countdown, 1-click copy buttons.
5. FE starts WebSocket listener for `PAYMENT_RESULT`.
6. Execution/result handling follows UC_2.8.1 §5 (7b success / 8 failure). Timer-expiry is Modal 2-specific (see Exceptional Flow E2).

### 3. ACTIVITY FLOW

```
flowchart TD
    subgraph User
        A([Click Pay with Crypto]) --> B[Modal 1: select currency]
        C[Modal 2 State B:<br/>scan QR / copy address]
        D[User sends crypto<br/>from personal wallet]
    end

    subgraph System
        E[Fire POST /capture-lead]
        F{Token supported<br/>by Triple-A?}
        G[Toast error<br/>dropdown stays open]
        H[Modal 1 closes<br/>Modal 2 State B opens]
        I[Start WebSocket listener]
        J{25-min timer<br/>vs PAYMENT_RESULT?}
        K[State C: Timer Expired<br/>Reload button, modal stays open]
        L[UC_2.8.1 step 7b<br/>Success]
        M[UC_2.8.1 step 8<br/>Failure]
    end

    A --> E --> B --> F
    F -- No --> G --> B
    F -- Yes --> H --> C --> I --> D --> J
    J -- Timer expires first --> K --> C
    J -- Success received --> L
    J -- Failure received --> M
```

### 4. SCREEN DESCRIPTION

**Modal 1 — Currency Selection**

| # | Element | Type | Required? | Description |
|---|---|---|---|---|
| 1 | Modal title | Static Text | N/A | Text: *"Action Required to Complete Purchase"*. |
| 2 | [X] Close | Button (Icon) | N/A | Top-right. On click → dismiss modal (Ref Exceptional Flow E3). |
| 3 | Instructional text | Static Text | N/A | *"You must actively send from your personal crypto wallet to the address provided below. This order will not complete until is detected on the blockchain."* |
| 4 | "Select a cryptocurrency:" | Label | N/A | Static label above dropdown. |
| 5 | Cryptocurrency Dropdown | Dropdown | Yes | **Displaying Rules:** Placeholder *"Select"*, no default. Options populated dynamically from `icon_tags[]` (e.g. btc, usdt, eth), each rendered with currency icon + ticker symbol (confirmed from source doc). **Behaviour Rules:** Unsupported token → toast error (raw Triple-A message), dropdown stays open. |
| 6 | Hint text | Static Text | N/A | *"Select a cryptocurrency to generate payment details."* (confirmed verbatim, unchanged) |
| 7 | [Continue] | Button (Primary) | N/A | Disabled until currency selected. On click → Modal 1 closes, Modal 2 opens (State B). |

**Modal 2 — Payment Details, State B**

| # | Element | Type | Required? | Description |
|---|---|---|---|---|
| 1–3 | Title / [X] / Instructional text | Same as Modal 1 | N/A | Identical. |
| 4 | Selected currency indicator | Static Text + icon | N/A | Read-only — must close and restart from Modal 1 to change currency. |
| 5 | Countdown timer | Static Text (auto-updating) | N/A | Label: *"Guaranteed Rate Expires in:"* — `25m : 00sec` counting down. |
| 6 | QR code section heading | Section heading | N/A | *"Scan This QR Code with your Mobile Crypto Wallet App"*. |
| 7 | QR code image | Image | N/A | Encodes wallet address for selected currency, rendered by Triple-A. |
| 8 | Crypto Amount Due | Static Text + Copy icon | N/A | Value + copy icon → "Copied!" for 5s, reverts. |
| 9 | Network Address | Static Text + Copy icon | N/A | **Label is dynamic per selected currency** (confirmed from source doc) — e.g. *"Bitcoin Network Address"* for BTC, equivalent wording for other selected currencies. Value: wallet address string, truncate + tooltip on overflow. Same copy behavior as row 8. |
| 10 | Network warning | Warning banner | N/A | *"Warning: Send only [currency] via the [network] network. Sending via any other network will result in the permanent loss of your funds."* |

**Modal 2 — State C (Timer Expired)**

| # | Element | Type | Required? | Description |
|---|---|---|---|---|
| 1–3 | Same as State B | — | N/A | — |
| 4 | Timer-expired alert | Alert (Inline, error) | N/A | *"Time is expired. Please reload to get the latest crypto amount due."* |
| 5 | [Reload] | Button (Primary) | N/A | On click → fetches new rate, restarts 25-min countdown, re-enters State B. |

### 5. BUSINESS RULES

| # | BR Code | Function | Description |
|---|---|---|---|
| 1 | BR_2.7.5.1 | Two Separate Modals | Modal 1 (Currency) and Modal 2 (Payment Details) are distinct — Modal 2 transitions in place across State B → C or B → Confirmed, never replaced by a third modal. |
| 2 | BR_2.7.5.2 | Crypto Payment Irreversibility | Cannot be auto-refunded via gateway API. Post-payment restricted-region match → restricted region screen (see UC_2.8.1 Exceptional Flow), full refund logic lives in UC_2.8.2 §2 (ledger-log + Freshdesk ticket, `[CHR-8]`). |
| 3 | BR_2.7.5.3 | WebSocket Listener Survival Across Modal Close | If payment initiated then modal closed, WS listener must NOT terminate — stays open until `PAYMENT_RESULT` or timeout. |
| 4 | BR_2.7.5.4 | Crypto Token List Is Dynamic | Never hardcoded — sourced from `Payment_Method_Config.TRIPLE_A.icon_tags[]`. Admin changes reflect automatically, no FE code change. |

### 6. MESSAGE LIST

| # | Message Code | Type | Message (EN) | Message (VN) | Trigger |
|---|---|---|---|---|---|
| 1 | (Toast, no code assigned) | Toast — Error | Raw error message returned by Triple-A (not rewritten by FE) | (N/A — raw passthrough) | Unsupported token selected |
| 2 | (Inline, no code assigned) | Validation (Inline) | "Time is expired. Please reload to get the latest crypto amount due." | (Cần xác nhận) | 25-min timer expires |

---

## UC_2.7.6 — Skrill

### 1. USE CASE SPECIFICATION TABLE

| Field | Content |
|---|---|
| **Use Case ID** | UC_2.7.6 |
| **Use Case Name** | Skrill |
| **Use Case Description** | **REMOVED by [CHR-23].** This payment method no longer exists in the current system. |
| **Actor(s)** | N/A |
| **Pre-Condition(s)** | N/A |
| **Trigger** | N/A |
| **Post-Condition(s)** | N/A |
| **Basic Flow** | N/A |
| **List Screen** | **Any Figma frame still showing Skrill is outdated — remove it.** (See §0 Wireframe Gap Log item #1.) |
| **Exception Flow** | N/A |

*(No further sections — kept as a placeholder UC_ID per project convention so downstream references to "UC_2.7.6" remain traceable to "removed", not "missing".)*

---

## UC_2.7.7 — Dusupay

### 1. USE CASE SPECIFICATION TABLE

| Field | Content |
|---|---|
| **Use Case ID** | UC_2.7.7 |
| **Use Case Name** | Dusupay |
| **Use Case Description** | This use case allows the User in a supported African market to pay via Mobile Money, Bank, or Card through Dusupay's hosted page, in order to complete purchase using locally preferred rails. |
| **Actor(s)** | User, Dusupay |
| **Pre-Condition(s)** | `DUSUPAY` method available for user's country. **Confirmed testing constraint (source doc, explicit):** *"Currently only testable for NGN (Nigeria), KE (Kenya), UG (Uganda)"* — other target countries listed under Dusupay's `gateway_router` are **not yet available for testing**, not a permanent country restriction. This is a live testing-scope note QC should track. |
| **Trigger** | User selects a Dusupay sub-method and clicks CTA. |
| **Post-Condition(s)** | Success → OV-06 (2s) → UC_2.8.3. Decline → BN-12 on FP-06. 10-min timeout → BN-01 on FP-06. Either → [Return to Payment page] → Step 6. |
| **Basic Flow** | 1. User clicks CTA. 2. FE fires `POST /capture-lead`. 3. FE calls `/execute-checkout` with sub-method (Mobile_money/Bank/Card). 4. Backend returns Dusupay hosted-page link w/ Return URL to FP-06. Active tab redirects fully — no secondary tab. 5. User completes/abandons on Dusupay page, clicks provider CTA → redirected back to FP-06. 6. FE polls/listens via WS for `PAYMENT_RESULT` — holds until confirmation or 10-min timeout. 7. Result handling per UC_2.8.1 §5 outcome 7c. |
| **List Screen** | Step 6 (method selection) → external Dusupay hosted page → FP-06 (return screen) |
| **Exception Flow** | E1 — Transaction exceeds max amount: aborted pre-redirect, FP-06 renders with BN-13. E2 — Provider timeout (30s at `/execute-checkout`): aborted pre-redirect, FP-06 renders with BN-15. |

### 2. DISPLAY RULES

- Dusupay corporate logo must NOT appear in the payment method radio group.
- `icon_tags[]` (e.g. "m-pesa", "capitec") mapped to local SVG icons.
- 3 sub-methods, all same Hosted Page redirect pattern: Mobile_money, Bank, Card.

### 3. ACTIVITY FLOW

```
flowchart TD
    subgraph User
        A([Select Dusupay sub-method]) --> B[Click CTA]
        F[Complete/abandon payment<br/>on Dusupay hosted page]
        G[Click provider CTA]
    end

    subgraph System
        C[Fire POST /capture-lead]
        D[Call POST /execute-checkout<br/>with sub-method]
        E{Transaction exceeds max<br/>or provider timeout 30s?}
        E1[Abort pre-redirect<br/>FP-06 + BN-13 or BN-15]
        H[Redirect active tab fully<br/>to Dusupay hosted page]
        I[Redirect back to FP-06<br/>Verifying Your Payment...]
        J[Poll/listen WebSocket<br/>for PAYMENT_RESULT]
        K{Result within 10 min?}
        L[OV-06 2s -> UC_2.8.3]
        M[BN-12 decline<br/>Return to Payment page]
        N[BN-01 timeout<br/>Return to Payment page]
    end

    B --> C --> D --> E
    E -- Yes --> E1
    E -- No --> H --> F --> G --> I --> J --> K
    K -- Success --> L
    K -- Decline --> M
    K -- No response in 10min --> N
```

### 4. SCREEN DESCRIPTION

N/A dedicated fields — Dusupay's hosted page UI is entirely provider-controlled. Stack Trading-owned screens in this flow are Step 6 (see UC_2.7.1) and FP-06 (see UC_2.8.1 message list).

### 5. BUSINESS RULES

| # | BR Code | Function | Description |
|---|---|---|---|
| 1 | (Historical note, confirmed from source doc) | UC_2.7.7 Previously Covered a Bundled Flow | This UC_ID previously covered a bundled "Regional Payment Aggregators" flow (Nomupay, Nuvei, Dusupay via a vendor-hosted popup + WebSocket pattern). **Nomupay and Nuvei are now removed from checkout entirely.** Dusupay is retained under this same UC_ID but has been rebuilt on the full-tab-redirect pattern described in §3 above — not the old popup pattern. Anything in older wireframes or docs describing a "hosted popup" for Dusupay is outdated. |

### 6. MESSAGE LIST

| # | Message Code | Type | Message (EN) | Message (VN) | Trigger |
|---|---|---|---|---|---|
| 1 | BN-12 | Error (Banner) | (Cần xác nhận: raw Dusupay decline reason, not rewritten) | (Cần xác nhận) | Genuine decline received on FP-06 |
| 2 | BN-01 | Error (Banner) | "Payment session expired. If you already submitted your payment, please check your email for confirmation. If you have not paid yet, please try again." | (Cần xác nhận) | 10-min timeout on FP-06 |
| 3 | BN-13 | Error (Banner) | (Cần xác nhận: exact wording — max transfer threshold exceeded) | (Cần xác nhận) | Transaction exceeds Dusupay max amount |
| 4 | BN-15 | Error (Banner) | (Cần xác nhận: exact wording — provider timeout) | (Cần xác nhận) | Dusupay doesn't respond within 30s |

---

## UC_2.7.9 — T365

### 1. USE CASE SPECIFICATION TABLE

| Field | Content |
|---|---|
| **Use Case ID** | UC_2.7.9 |
| **Use Case Name** | T365 |
| **Use Case Description** | This use case allows the User to pay via T365's hosted page in local currency, in order to complete purchase in markets where USD settlement is not preferred, with server-side FX conversion applied automatically. |
| **Actor(s)** | User, T365, CurrencyLayer (background) |
| **Pre-Condition(s)** | `T365` method available for user's country. Redis FX cache populated (or falls back to last good rate). |
| **Trigger** | User selects T365 and clicks CTA. |
| **Post-Condition(s)** | Same redirect/return/timeout pattern as UC_2.7.7 (Dusupay). |
| **Basic Flow** | Identical structure to UC_2.7.7, substituting T365 as provider, PLUS a server-side FX conversion step (§4 below) before the hosted-page link is generated. |
| **List Screen** | Step 6 (method selection) → external T365 hosted page → FP-06 |
| **Exception Flow** | E1 — Exceeds max amount: FP-06 + BN-13. E2 — Below min amount: FP-06 + BN-14. E3 — Provider timeout (30s): FP-06 + BN-15. |

### 2. FX CONVERSION MECHANISM `[CHR-68]`

| Component | Detail |
|---|---|
| **Ingestion Worker** | Background cron polls CurrencyLayer `/live` every 60s. Stores rate table in Redis key `fx:rates:usd` + timestamp `fx:rates:last_updated`. |
| **Read Path** | Checkout NEVER calls CurrencyLayer directly — reads only from Redis cache (sub-millisecond, no 3rd-party dependency at request time). |
| **Formula** | `Effective_Target_Amount = Base_USD_Amount × (Cached_Exchange_Rate × 1.005)` — fixed 0.5% slippage buffer. |
| **Stale Cache Handling** | If `(now - last_updated) > 120s`: does NOT abort checkout — falls back to last known good rate + fires Slack alert to `#ops-general`. |
| **`/calculate-cart` response addition** | `{ base_price_usd, discount_amount_usd, tax_amount_usd, total_price_usd, currency, fx_rate_applied, converted_total }`. |

### 3. ACTIVITY FLOW

```
flowchart TD
    subgraph User
        A([Select T365]) --> B[Click CTA]
        F[Complete/abandon payment<br/>on T365 hosted page]
        G[Click provider CTA]
    end

    subgraph System
        C[Fire POST /capture-lead]
        D[Server-side FX calculation<br/>read Redis fx:rates:usd]
        D1{Cache age > 120s?}
        D2[Use last good rate<br/>+ Slack alert #ops-general]
        E[Call POST /execute-checkout<br/>with converted_total]
        H{Amount above max<br/>or below min<br/>or provider timeout?}
        H1[Abort pre-redirect<br/>FP-06 + BN-13/BN-14/BN-15]
        I[Redirect active tab fully<br/>to T365 hosted page]
        J[Redirect back to FP-06]
        K[Poll/listen WebSocket]
        L{Result within 10 min?}
        M[OV-06 2s -> UC_2.8.3]
        N[BN-12 decline]
        O[BN-01 timeout]
    end

    B --> C --> D --> D1
    D1 -- Yes --> D2 --> E
    D1 -- No --> E
    E --> H
    H -- Yes --> H1
    H -- No --> I --> F --> G --> J --> K --> L
    L -- Success --> M
    L -- Decline --> N
    L -- No response --> O
```

### 4. SCREEN DESCRIPTION

N/A dedicated fields — T365's hosted page is entirely provider-controlled.

### 5. BUSINESS RULES

| # | BR Code | Function | Description |
|---|---|---|---|
| 1 | `[CHR-68]` | FX Conversion Required for T365 | See §2 mechanism table above. Reusable as a utility service for future APM integrations per source doc. |

### 6. MESSAGE LIST

| # | Message Code | Type | Message (EN) | Message (VN) | Trigger |
|---|---|---|---|---|---|
| 1 | BN-13 | Error (Banner) | (Cần xác nhận) | (Cần xác nhận) | Transaction exceeds T365 max amount |
| 2 | BN-14 | Error (Banner) | (Cần xác nhận) | (Cần xác nhận) | Transaction below T365 min amount |
| 3 | BN-15 | Error (Banner) | (Cần xác nhận) | (Cần xác nhận) | T365 doesn't respond within 30s |
| 4 | BN-01 | Error (Banner) | "Payment session expired. If you already submitted your payment, please check your email for confirmation. If you have not paid yet, please try again." | (Cần xác nhận) | 10-min timeout on FP-06 |

---

## UC_2.7.8 — Apply Promo Code

### 1. USE CASE SPECIFICATION TABLE

| Field | Content |
|---|---|
| **Use Case ID** | UC_2.7.8 |
| **Use Case Name** | Apply Promo Code |
| **Use Case Description** | This use case allows the User to apply a discount code to their order, in order to reduce the total price before payment, with the reservation only finalized at the moment of successful payment. |
| **Actor(s)** | User, System |
| **Pre-Condition(s)** | User is at Step 6. |
| **Trigger** | User clicks "Have a promo code?" or the expand button. |
| **Post-Condition(s)** | Success: Order Summary shows Discount + Subtotal lines, input locked, button = [Remove]. Failure: inline error, input stays editable (or locked-with-error for re-validation failures — see §3 step 5/BR_2.7.8.6). |
| **Basic Flow** | See Detailed Flow below (§2). |
| **List Screen** | Step 6 — Promo code panel (expandable) |
| **Exception Flow** | E1 — HTTP 422 (invalid/expired/limit): inline error IN-PROMO-02 or IN-PROMO-03, [Apply] re-enables, input editable. E2 — HTTP 5xx: Ref TE-SYS-01. |

### 2. DETAILED BASIC FLOW

1. User clicks "Have a promo code?" → input + [Apply] expand.
2. [Apply] disabled until ≥1 character entered.
3. User enters code, clicks [Apply] → spinner + disabled → `POST /calculate-cart` with `promo_code`.
4. HTTP 200 (`discount_amount > 0`): inline success (IN-PROMO-01); Discount line appears (labeled `Promo code (<code>)`, code as-typed); Tax/Total update (Ref BR_2.7.8.5); **input LOCKS**, [Apply] swaps to [Remove].
5. HTTP 422: inline error (IN-PROMO-02 invalid/expired/limit, or IN-PROMO-03 per-user limit, or IN-PROMO-05 product mismatch); [Apply] re-enables, input editable.
6. HTTP 5xx: Ref TE-SYS-01.
7. [Remove] click → spinner + disabled → `/calculate-cart` without `promo_code` → recalculates Tax/Total → removes Discount line → unlocks + clears input → button reverts to [Apply] → clears success text.
8. User may enter a new code and repeat from step 3.

> Note: once applied, input is locked — [Remove] is the ONLY way to change/clear. There is no "edit while applied" state.

### 3. ACTIVITY FLOW

```
flowchart TD
    subgraph User
        A([Click Have a promo code?]) --> B[Enter code]
        B --> C[Click Apply]
        H[Click Remove]
    end

    subgraph System
        D[Spinner + disabled<br/>Call POST /calculate-cart with promo_code]
        E{Response?}
        F1[HTTP 200: discount_amount > 0<br/>Show IN-PROMO-01<br/>Add Discount + Subtotal rows<br/>LOCK input, swap to Remove]
        F2[HTTP 422: invalid/expired/limit<br/>Show IN-PROMO-02/03/05<br/>Apply re-enables, input editable]
        F3[HTTP 5xx: Ref TE-SYS-01]
        I[Spinner + disabled<br/>Call /calculate-cart without promo_code]
        J[Recalculate Tax/Total<br/>Remove Discount+Subtotal rows<br/>Unlock + clear input<br/>Revert to Apply]
    end

    C --> D --> E
    E -- 200 --> F1
    E -- 422 --> F2
    E -- 5xx --> F3
    H --> I --> J
```

### 4. SCREEN DESCRIPTION

| # | Component | Type | Required? | Description |
|---|---|---|---|---|
| 1 | Promo code input | Search Field | No | **Validation Rules:** Max 100 chars (block input at limit). **Behaviour Rules:** Expands on "Have a promo code?" click. Locks (read-only) after successful apply. Stays locked with the now-invalid code on re-validation failure at Pay time — not auto-cleared (Ref BR_2.7.8.6). |
| 2 | [Apply] / [Remove] | Button (Secondary) | N/A | **Validation Rules:** [Apply] disabled when input empty. [Remove] always enabled once applied. **Behaviour Rules:** See Detailed Basic Flow steps 3–7. |
| 3 | Inline success text | Static Text | N/A | **Displaying Rules:** Visible below input on HTTP 200 success (Ref IN-PROMO-01). Persists while applied; cleared only on [Remove]. |
| 4 | Inline error text | Static Text | N/A | **Displaying Rules:** IN-PROMO-02 (invalid/expired/limit), IN-PROMO-05 (product mismatch, `[CHR-55]`), IN-PROMO-03 (per-user limit), IN-PROMO-04 (re-validation failure at Pay click — requires manual [Remove], not auto-cleared). |
| 5 | Discount (Order Summary row) | Static Text | N/A | **Displaying Rules:** Visible when `discount_amount > 0`. Position: between base price row and Tax row. Label: `Promo code (<code>)`. Amount: `−$XX.XX` (Ref CR-11). Removed only via [Remove]. |
| 6 | Subtotal (Order Summary row) `[CHR-51]` | Static Text | N/A | **Displaying Rules:** Same show/hide rule as Discount row — directly below it. Label: `Subtotal`. Value: `(Base_Price + Addon_Prices) − discount_amount` (positive format, Ref CR-11). Appears/disappears together with Discount row. |

### 5. BUSINESS RULES

| # | BR Code | Function | Description |
|---|---|---|---|
| 1 | BR_2.7.8.1 | Apply Trigger — Click Only | `/calculate-cart` w/ promo code fires only on explicit [Apply] click, never `onBlur`. User may apply/re-apply different codes multiple times before payment — replaces the prior discount each time. **Mark-as-used timing (Pessimistic Locking, `[CHR-20]`):** `current_usage_count` incremented AFTER server-side price/tax check passes at `/execute-checkout` time (step 6.1.b) — NOT at [Apply] click. Genuine decline → restored immediately (+1). 10-min timeout → NOT restored immediately — stays reserved until backend webhook confirms explicit failure. Success → deduction kept permanently + `promo_code_usage_log` record inserted. |
| 2 | BR_2.7.8.2 | One Promo Code Per Transaction | Only one code may be applied per checkout. |
| 3 | BR_2.7.8.3 `[CHR-51]` | Subtotal Field | See Screen Description row 6. |
| 4 | BR_2.7.8.4 `[CHR-7]` | Promo Code Types & DB Schema | Percentage discount: `discount_amount = Base_Price × rate`. Flat-rate: `discount_amount = promo_code_value`. FE only reads `discount_amount` — never the type. Input case-insensitive. **`promo_codes` table:** `code, discount_amount, discount_percentage (nullable), expiration_date, usage_limit, current_usage_count, max_uses_per_user (nullable, default 1), product_id (enum, NOT NULL)`. Invalid if: expired OR `current_usage_count >= usage_limit` OR personal count `>= max_uses_per_user`. |
| 5 | BR_2.7.8.5 | Tax Calculated on Post-Discount Amount | Quaderno receives `Final_Amount = (Base_Price + Addon_Prices) − discount_amount`, NOT the base price. `Total = Final_Amount + tax_amount`. Percentage discount applies to `Base_Price` only, not add-ons. |
| 6 | BR_2.7.8.6 | Promo Code Re-Validation at Execute-Checkout | Re-validated AND reserved atomically at step 6.1.b of `/execute-checkout` — only after price/tax check (6.1.a) passes. Priority: if 6.1.a fails (`PRICE_CHANGED`), promo re-validation is entirely skipped for that attempt (no promo error shown). If code invalid/limit-reached at this point → HTTP 422, banner IN-PROMO-04 (not overlay), Discount+Subtotal rows removed, Tax/Total revert, input stays locked with now-invalid code (manual [Remove] required). |
| 7 | BR_2.7.8.7 `[CHR-55]` | Promo Code Mapped 1-to-1 to Product ID | Recognized `product_id` values: `EVAL_L1, EVAL_L2, EVAL_L5, RESET, REBUY, EXTENSION, MARKET_DATA`. Mismatch check runs at [Apply] click only → IN-PROMO-05. |

### 6. MESSAGE LIST

| # | Message Code | Type | Message (EN) | Message (VN) | Trigger |
|---|---|---|---|---|---|
| 1 | IN-PROMO-01 | Validation (Inline, success) | (Cần xác nhận: exact wording) | (Cần xác nhận) | Promo applied successfully |
| 2 | IN-PROMO-02 | Validation (Inline, error) | (Cần xác nhận: invalid/expired/limit-reached wording) | (Cần xác nhận) | HTTP 422 at [Apply] click |
| 3 | IN-PROMO-03 | Validation (Inline, error) | (Cần xác nhận: per-user limit wording) | (Cần xác nhận) | `max_uses_per_user` exceeded |
| 4 | IN-PROMO-04 | Error (Banner, not overlay) | (Cần xác nhận: re-validation failure wording) | (Cần xác nhận) | Promo invalid/limit reached at `/execute-checkout` time |
| 5 | IN-PROMO-05 `[CHR-55]` | Validation (Inline, error) | (Cần xác nhận: product mismatch wording) | (Cần xác nhận) | Promo `product_id` mismatch at [Apply] click |
| 6 | TE-SYS-01 | Error | (Cần xác nhận) | (Cần xác nhận) | HTTP 5xx on `/calculate-cart` |

---
---

# STEP 7 — ORDER PROCESSING & PROVISIONING

## UC_2.8.1 — Phase 1: Payment Execution

### 1. USE CASE SPECIFICATION TABLE

| Field | Content |
|---|---|
| **Use Case ID** | UC_2.8.1 |
| **Use Case Name** | Phase 1 — Payment Execution |
| **Use Case Description** | This use case allows the System to execute the actual charge against the selected gateway with full server-side integrity checks, in order to guarantee no duplicate charges, correct pricing, and correct promo-code accounting regardless of payment method or network reliability. |
| **Actor(s)** | User, System, NMI, Triple-A, Dusupay, T365, Quaderno |
| **Pre-Condition(s)** | Payment method selected, all required fields completed. `/calculate-cart` already succeeded (pricing/tax/totals up to date). No active email lock (`[CHR-9]`). |
| **Trigger** | User clicks the CTA button on Step 6. |
| **Post-Condition(s)** | Success: payment executed, OV-06 → confirmation state, Flow 1 triggered via webhook. Failure: OV-05 dismissed, failure banner, retry allowed. Email Lock: 5+ failures → OV-03, all inputs locked 15 min. Post-Payment 403: full-page Service Unavailable, automated refund initiated where possible. |
| **Basic Flow** | See Detailed Flow below (§2) — steps run in strict sequence; steps 6–7 are server-side within the single `/execute-checkout` call. |
| **List Screen** | Step 7 Phase 1 — Processing overlay, Payment Successful overlay, Failure banner state, Email lock overlay, Post-payment restricted-region refund states |
| **Exception Flow** | See §3 below (10-min timeout, HTTP 409 duplicate, post-success double-payment race, 5-Failure Email Lock). |

### 2. DETAILED BASIC FLOW

**Payment Submission (client-side):**
1. User clicks CTA. 2. CTA disabled immediately (Ref BR_2.8.1.1). 3. OV-05 renders. 4. (Promo reservation happens server-side later, at step 6.1.b — not here.) 5. FE calls `POST /execute-checkout` with the following payload (confirmed complete parameter table from source doc, v4.12 — supersedes the summarized version in the prior draft):

| Parameter | Source |
|---|---|
| `product_id` | Session state |
| `addon_ids` | Session state |
| `promo_code` | Session state (if applied) |
| `billing_country` | Session state (Step 5) — forwarded to gateway for AVS check |
| `billing_region` | Session state (Step 5) — forwarded to gateway for AVS check |
| `billing_city` | Session state (Step 5) — forwarded to gateway for AVS check `[CHR-90]` |
| `billing_address` | Session state (Step 5) — forwarded to gateway for AVS check *(previously omitted from this draft's summarized table — now added)* |
| `zip_code` | Session state (Step 5), conditional per `country_zip_requirements` — forwarded to gateway for AVS check |
| `payment_method` | e.g. `"CC"`, `"CRYPTO"`, `"GOOGLE_PAY"` |
| `payment_token` | Gateway-specific token (e.g. NMI Collect.js response) (Optional) |
| `utm_source/medium/campaign/term/content` | Read from `localStorage` at submit time, per CR-12 (Optional) |
| `user_ip` | Backend-detected (silent) |
| `timestamp_utc` | FE-generated at submit (silent, Optional) |
| `everflow_transaction_id` | Everflow SDK cookie via `getTransactionId()` (silent, Optional) — `NULL` if SDK failed to load |
| `everflow_sdk_blocked` | FE-generated boolean (silent, Optional) — `true` when SDK failed to load; fail-open, does not block checkout |
| `st_affiliate_data` | First-party cookie parsed from raw URL affiliate params (silent, Optional) — forwarded only when `getTransactionId()` returns `null` |
| `user_id` | Current logged-in user (Optional) |

**Backend `/execute-checkout` Workflow (server-side, steps 6–7 of the same call):**

6.0. **Dedup Check** (first, before any gateway ping): if `provider_event_id IS NOT NULL` for this `user_id` → **HTTP 409**, no charge/gateway/promo-reservation/audit-PDF, FE dismisses OV-05 → renders BN-07. If NULL → proceed (covers new/failed/in-progress attempts, Ref BR_2.8.1.5).

6.1. **Sanctions & Pricing** (strict order):
  - (a) **Price/tax check** (before any promo reservation): compares server price/tax vs. client-submitted values. Mismatch (Founder slot filled, or tax changed) → `PRICE_CHANGED`, no charge, no promo reservation, OV-05 dismissed → OV-08 shown. *(Accepted race condition at Founder-500 boundary, Ref STAGE1-005 — intentionally out of scope, no queuing/locking implemented.)*
  - (b) **Promo re-validation + reservation** (only if (a) passes): atomic `current_usage_count += 1` (`[CHR-20]`).
  - (c) **Sanctions/other integrity checks**: any mismatch routes to step 8 like a normal decline.

6.2. **Audit**: static PDF receipt (user_ip, timestamp_utc, gateway tx ID) → S3 WORM, URI saved to user record (Ref PDF-01).

6.3. **Routing Execution**: CC/Apple Pay/Google Pay → Weighted Round-Robin MID selection via `Merchant_Routing_Config`, NMI charge. Crypto → Triple-A session payload. Dusupay → hosted-page link w/ Return URL to FP-06. T365 → server-side FX recalculation (Ref UC_2.7.9 §4) then hosted-page link w/ Return URL to FP-06.

6.4. **Attribution**: writes UTM + `everflow_transaction_id` to user record; S2S fallback if SDK blocked (Ref BR_2.6.1.3).

6.5. **Post-Success DB Write**: `Users.last_purchase_date = NOW()` on confirmed success. **Double-payment gate `[CHR-21]`**: checks if `provider_event_id` already set by a DIFFERENT charge before writing — if so, does not overwrite, does not re-trigger Flow 1 (see §3 exceptional flow).

7. Gateway response resolves into exactly ONE of 3 mutually exclusive outcomes:

**7a. Success — Synchronous** (CC/Apple Pay/Google Pay): HTTP 200 → OV-05→OV-06 (auto-dismiss) → SES-01 dispatched → transitions directly into Phase 2 (UC_2.8.3).

**7b. Success — Asynchronous, overlay held** (Crypto, Bank Transfer): OV-05 holds, WS listener for `PAYMENT_RESULT` → on success, same OV-06 + SES-01 + Phase 2 transition as 7a.

**7c. Success — Asynchronous, full-page redirect** (Dusupay, T365): full active-tab redirect → Return URL → FP-06 → WS confirmation → on success: OV-06 (2s) + SES-01 + Phase 2. On decline: BN-12 + [Return to Payment page]. On 10-min timeout: BN-01 + same button.

**8. Payment Failure & Retry** (from 7a decline, 7b failure, or timeout):
  - 8.1. Gateway decline OR 10-min frontend timer expires → routes here. **10-min rule does NOT apply to Triple-A** — that uses its own 25-min rate-lock window instead.
  - 8.2. OV-05/active widget dissolves (7a/7b). For 7c, OV-05 never rendered — BN-12/BN-01 render directly on FP-06 instead.
  - 8.3. Genuine decline → Orizon red banner with RAW gateway decline reason (not rewritten/generalized).
  - 8.4. CTA re-enables. User may retry (same or different method). New click dismisses current failure banner.
  - 8.5. Promo reservation handling on failure: genuine decline → immediate `-1` rollback, no `promo_code_usage_log` entry. 10-min timeout → NOT rolled back immediately (webhook is source of truth) — rolled back only when delayed webhook confirms explicit failure; kept permanently if delayed webhook confirms success.

### 3. EXCEPTIONAL FLOW

| Scenario | Handling |
|---|---|
| **10-min frontend session timeout** | OV-05/widget dissolves. BN-01 (revised copy): *"Payment session expired. If you already submitted your payment, please check your email for confirmation. If you have not paid yet, please try again."* CTA re-enables. Server-side webhooks keep listening independently of what FE now shows. |
| **HTTP 409 — Duplicate Payment** | `provider_event_id` already exists (prior payment succeeded). OV-05 dismissed → BN-07 renders. No new charge. CTA re-enables. User advised to check email/spam for Claim Account link. |
| **Double-Payment Detected Post-Success `[CHR-21]`** | Race condition: 2 independent `/execute-checkout` attempts both passed Dedup Check while `provider_event_id` was NULL, and BOTH later clear successfully (typically original + a post-timeout retry). OV-05 dismisses on the retried attempt's screen; user STAYS on Step 6. BN-10 renders. CTA stays disabled. Provisioning unaffected — Flow 1 already ran off the FIRST successful charge. Duplicate (2nd) charge logged to financial ledger + high-priority Freshdesk ticket for treasury desk restitution — no auto- or manual on-the-spot refund branch (`[CHR-8]` irreversible-refund path applies to ALL methods here, regardless of individual reversibility). |
| **5-Failure Email Lock `[CHR-9]`** | 5+ consecutive declines within rolling 10-min window, cross-method (e.g. 3 CC + 2 Crypto = 5), keyed by EMAIL (not IP, not device). Counted by RESPONSE arrival order, not request dispatch order. 15-min lock, Redis-backed, keyed by email. Late-resolving in-flight attempt from before the lock: success → lock dismissed, OV-06 shown; failure → counted normally, no additional effect. Page reload / forward-nav while locked → OV-03 re-renders on mount. Direct API bypass → HTTP 429 → FE catches → re-renders OV-03. Counter resets to 0 after 15 min. NMI's own IP-based velocity blocking operates independently — this Email lock does not replace or depend on it. |

### 4. SCREEN DESCRIPTION

| # | Component | Type | Required? | Description |
|---|---|---|---|---|
| 1 | Processing Overlay | Modal (blocking) | N/A | **Displaying Rules:** Orizon dark overlay + gold spinner. Text (per RFQ baseline, confirm current copy): *"Please do not refresh the page or click the back button. This may take a few moments."* Ref OV-05. |
| 2 | Success Overlay | Modal (auto-dismiss) | N/A | **Displaying Rules:** "Payment Successful" state, auto-dismisses after ~2s. Ref OV-06. |
| 3 | Failure Banner | Banner (inline, top of screen) | N/A | **Displaying Rules:** Red banner, RAW gateway decline text (not generalized). CTA re-enables alongside it. |
| 4 | Email Lock Overlay | Modal (blocking, 15-min countdown) | N/A | **Displaying Rules:** Ref OV-03. All inputs disabled underneath. |
| 5 | Post-Payment Restricted-Region — Refunding | Full-page state | N/A | Ref BN-03a. |
| 6 | Post-Payment Restricted-Region — Refunded | Full-page state | N/A | Ref BN-03b. |
| 7 | FP-06 "Verifying Your Payment..." | Full-page (Dusupay/T365 only) | N/A | Spinner + text, holds until WS confirms; on failure shows BN-12/BN-01 + [Return to Payment page]. |

### 5. BUSINESS RULES

| # | BR Code | Function | Description |
|---|---|---|---|
| 1 | BR_2.8.1.1 | CTA Disabled During Processing | Disabled from click until API resolves or 10-min timer expires. Prevents duplicate charges. OV-05 must cover UI during this window. |
| 2 | BR_2.8.1.2 | 5-Failure Lock Is Cross-Method | See §3 Exceptional Flow table above — email-keyed, response-order counted. |
| 3 | BR_2.8.1.3 | CTA Re-enable on Failure Only | Not re-enabled on overlay dismissal or back-nav while payment in progress — only on an actual failure response (incl. 10-min timeout). |
| 4 | BR_2.8.1.4 `[CHR-21]` | Accidental Double-Payment After Timeout Retry | See §3 Exceptional Flow table — always routes through irreversible-refund/Freshdesk path (`[CHR-8]`), never an on-the-spot refund, regardless of the method's individual reversibility. |
| 5 | BR_2.8.1.5 | Retry Allowed When Prior Payment Failed or In-Progress | Dedup Check (6.0) does not block retries for failed or still-in-progress prior attempts — only blocks when a prior attempt for this `user_id` already succeeded. |
| 6 | BR_2.8.1.6 (referenced) | Late In-Flight Resolution Under Lock | See §3 Exceptional Flow table, "5-Failure Email Lock" row "Late in-flight resolution". |

### 6. MESSAGE LIST

| # | Message Code | Type | Message (EN) | Message (VN) | Trigger |
|---|---|---|---|---|---|
| 1 | OV-05 | Alert (Popup, processing) | "Please do not refresh the page or click the back button. This may take a few moments." (confirm current copy) | (Cần xác nhận) | Payment submitted, awaiting result |
| 2 | OV-06 | Alert (Popup, success) | (Cần xác nhận) | (Cần xác nhận) | Payment succeeds |
| 3 | OV-03 | Alert (Popup, blocking) | (Cần xác nhận — email-lock state, 15-min countdown) | (Cần xác nhận) | 5th consecutive failure within 10 min |
| 4 | OV-08 | Alert (Popup) | (Cần xác nhận — price/tax changed, prompts [Refresh now]) | (Cần xác nhận) | `PRICE_CHANGED` at `/execute-checkout` |
| 5 | BN-01 | Error (Banner) | "Payment session expired. If you already submitted your payment, please check your email for confirmation. If you have not paid yet, please try again." | (Cần xác nhận) | 10-min frontend timeout |
| 6 | BN-07 | Error (Banner) | (Cần xác nhận — duplicate payment, check email for Claim Account link) | (Cần xác nhận) | HTTP 409 duplicate payment |
| 7 | BN-10 | Error (Banner) | (Cần xác nhận — informs user of double-charge, refund pending) | (Cần xác nhận) | Double-payment detected post-success |
| 8 | BN-03a | Error/Info (Full-page) | (Cần xác nhận — refund in progress) | (Cần xác nhận) | Post-payment restricted-region match, refund initiated |
| 9 | BN-03b | Error/Info (Full-page) | (Cần xác nhận — refund completed) | (Cần xác nhận) | Refund completes |
| 10 | FFE Code Error (backend) | FFE Code Error | (Cần xác nhận — any internal error codes returned by `/execute-checkout` not yet cataloged in this excerpt) | (Cần xác nhận) | Various backend validation failures |

---

## UC_2.8.2 — Flow 1: Provisioning Pipeline *(Backend-only)*

### 1. USE CASE SPECIFICATION TABLE

| Field | Content |
|---|---|
| **Use Case ID** | UC_2.8.2 |
| **Use Case Name** | Flow 1 — Provisioning Pipeline |
| **Use Case Description** | This use case allows the System to automatically provision a new trader's simulation account and dispatch onboarding emails after a successful payment, in order to complete account setup without manual intervention. |
| **Actor(s)** | System (Zapier), Rithmic/MT5/TraderEvolution, Everflow, Discord, Email service |
| **Pre-Condition(s)** | Payment success webhook received (from UC_2.8.1 outcome 7a/7b/7c). |
| **Trigger** | `NEW_PAYMENT_SUCCESS` webhook fired by `/execute-checkout` on confirmed success. |
| **Post-Condition(s)** | SIM account provisioned. Users table record created/updated. Everflow partner registered. Discord link token generated. Perk check run. Welcome + Claim Account emails dispatched. |
| **Basic Flow** | 9-step pipeline (see §2 below) — entirely backend, no user-facing screen. |
| **List Screen** | N/A — backend-only |
| **Exception Flow** | (Cần xác nhận: full exceptional-flow detail for Flow 1 was not available in the fetched excerpt — source doc references "UC_2.8.2 §Step 3 Exception" for the auto-retry mechanism on provisioning failure, consumed by UC_2.8.4. Recommend re-fetching the full UC_2.8.2 section directly from the BA portal to complete this table.) |

### 2. PIPELINE (9 STEPS)

1. **Dedup check** — event_id already processed? → HALT if match.
2. **Blacklist check** — email match? → Issue Refund + Restricted_Region_Notice email + HALT.
3. **Restricted region check** (secondary fail-safe) — billing_country match `Compliance_geo_restrictions`? → Issue Refund + HALT.
4. **Duplicate account check** — existing account status: `Active` → REJECT (email notice); `Failed/Terminated` → archive old record, reset level/Pod/Defense flags; `New` → proceed.
5. **Data & Platform Parsing** — reads platform, addon_ids, shirt_size; parses market data flags (CME/NYMEX/CBOT/COMEX).
6. **SIM Provisioning** — `POST /provision-sim-user` → Rithmic Paper Gateway (Futures) / MT5 Manager API / TraderEvolution Admin API (per platform) → returns username + KMS-encrypted password/license ciphertext.
7. **DB Write** — Users table: platform_username, ciphertext fields, `expiration_date = Today + 60 days`, `is_founder` (derivation now compares charged price vs. Founder Price per tier, `[CHR-53]` — not the raw cohort flag), market_data_flags, impact/everflow click id.
8. **Everflow Registration** — `POST /impact/register-partner`-equivalent (Everflow) → referral link created, `is_impact_partner=TRUE`. Discord: generates UUID token, stores `discord_link_token`.
9. **Perk Check** (Table H, Level 1) — Active + Claimed<Limit → triggers Fulfillment Zap (e.g. Hoodie). **Email dispatch:** Email 1 = Welcome (pre-provisioning, SES-01), Email 2 = Claim Account (contains JWT link) — split into **3 separate emails** per `[CHR-11]` (a 3rd email, Platform Setup Guide, is implied by the split but not detailed in the fetched excerpt — **Cần xác nhận** exact content of Email 3 vs. the self-service resend email referenced in UC_2.8.3).

### 3. ACTIVITY FLOW

```
flowchart TD
    subgraph Trigger
        A([NEW_PAYMENT_SUCCESS webhook received])
    end

    subgraph System - Zapier Flow 1
        B{1. Dedup check<br/>event_id processed?}
        B1([HALT - already processed])
        C{2. Blacklist match?}
        C1[Issue Refund<br/>Send Restricted_Region_Notice<br/>HALT]
        D{3. Restricted region<br/>secondary fail-safe?}
        D1[Issue Refund<br/>HALT]
        E{4. Duplicate account<br/>status?}
        E1[REJECT<br/>email notice]
        E2[Archive old record<br/>reset level/Pod/Defense]
        F[5. Parse platform/addons/shirt_size]
        G[6. SIM Provisioning<br/>Rithmic/MT5/TraderEvolution]
        H[7. DB Write - Users table<br/>ciphertext creds, is_founder CHR-53]
        I[8. Everflow registration<br/>Discord link token]
        J[9. Perk check Table H<br/>Dispatch Welcome + Claim Account emails]
    end

    A --> B
    B -- Match --> B1
    B -- No match --> C
    C -- Match --> C1
    C -- No match --> D
    D -- Match --> D1
    D -- No match --> E
    E -- Active --> E1
    E -- Failed/Terminated --> E2 --> F
    E -- New --> F
    F --> G --> H --> I --> J
```

### 4. SCREEN DESCRIPTION

N/A — entirely backend, no user-facing screen.

### 5. BUSINESS RULES

| # | BR Code | Function | Description |
|---|---|---|---|
| 1 | `[CHR-53]` | `is_founder` Derivation Changed | Now derived by comparing the price actually charged against the user's tier Founder Price (Table J) — NOT from the raw `Global_Var_Founder_Cohort_Open` flag at time of provisioning. This protects against the accepted race condition at STAGE1-005 (a user could be charged Standard price even if the flag flips mid-transaction, or vice versa — the flag alone is no longer trusted post-payment). |
| 2 | CR-20260720-003 | Everflow Replaces Impact.com | `impact_click_id` → `everflow_transaction_id`; `/impact/register-partner` → Everflow equivalent endpoint. |
| 3 | `[CHR-8]` | Refund/Restitution Mechanism (Reversible vs Irreversible) | Referenced from UC_2.7.5 (Crypto irreversibility) — full logic lives here per source doc §2, but full text was not present in the fetched excerpt. **Cần xác nhận:** exact reversible-method auto-refund API call vs. irreversible-method ledger-log + Freshdesk path. |

### 6. MESSAGE LIST

| # | Message Code | Type | Message (EN) | Message (VN) | Trigger |
|---|---|---|---|---|---|
| 1 | SES-01 | Email | Welcome (pre-provisioning) — (Cần xác nhận: full email copy) | (Cần xác nhận) | Payment success confirmed |
| 2 | (Email 2, code TBD) | Email | Claim Account — contains JWT activation link | (Cần xác nhận) | Immediately after SIM provisioning completes |
| 3 | Restricted_Region_Notice | Email | (Cần xác nhận: exact copy) | (Cần xác nhận) | Blacklist or restricted-region match post-payment |

---

## UC_2.8.3 — Phase 2: Account Claim

### 1. USE CASE SPECIFICATION TABLE

| Field | Content |
|---|---|
| **Use Case ID** | UC_2.8.3 |
| **Use Case Name** | Phase 2 — Account Claim |
| **Use Case Description** | This use case allows the User to activate their newly provisioned account by clicking the emailed link and providing a phone number, in order to proceed to Phase 3 (Provisioning & Redirect to Login) — notably WITHOUT setting a password at this step. |
| **Actor(s)** | User, System |
| **Pre-Condition(s)** | Email 2 (Claim Account) received, containing a valid JWT link. |
| **Trigger** | User clicks "Claim Your Account" link in Email 2. |
| **Post-Condition(s)** | `POST /claim-account` HTTP 200 → transitions to UC_2.8.4 (Phase 3). |
| **Basic Flow** | 1. User clicks emailed link. 2. If JWT valid (within 48h) → "Create an Account" screen renders: Phone Number field only (Ref `[CHR-11]` — password field REMOVED). 3. User enters phone, submits → `POST /claim-account` (email + transaction_id + phone_number). 4. HTTP 200 (fresh claim or resumed already-claimed link) → UC_2.8.4. |
| **List Screen** | Step 7 Phase 2 — "Create an Account" (Phone Number only) |
| **Exception Flow** | E1 — JWT expired: "Link Expired" screen + [Resend link] → `POST /public/resend-activation-link` (no auth, always HTTP 200 for anti-enumeration, `[CHR-10]`) → fires a 3rd email. E2 — Admin-side resend: separate Admin-only `POST /resend-welcome` (Admin JWT required) — BPS-only, out of user-facing scope. |

### 2. ACTIVITY FLOW

```
flowchart TD
    subgraph User
        A([Click Claim Your Account link<br/>in Email 2]) --> B{JWT valid, within 48h?}
        D[Enter Phone Number]
        E[Submit]
        F1[Click Resend link]
    end

    subgraph System
        C[Render Create an Account screen<br/>Phone Number field only - CHR-11]
        C1[Render Link Expired screen]
        G[Call POST /claim-account<br/>email + transaction_id + phone_number]
        H{Response?}
        I([Proceed to UC_2.8.4<br/>Phase 3 Provisioning])
        J[Call POST /public/resend-activation-link<br/>no auth, always HTTP 200<br/>fires 3rd email]
    end

    A --> B
    B -- Expired --> C1 --> F1 --> J
    B -- Valid --> C --> D --> E --> G --> H
    H -- 200 fresh or resumed --> I
```

### 3. SCREEN DESCRIPTION

| # | Component | Type | Required? | Description |
|---|---|---|---|---|
| 1 | Phone Number | Text Input w/ country code dropdown | Yes | **Description:** Sole PII field required at this phase. **Displaying Rules:** (Cần xác nhận: exact format/placeholder — likely follows CR-06 phone validation pattern.) **Behaviour Rules:** N/A. **Validation Rules:** Required. |
| 2 | [Activate Account] / [Submit] | Button (Primary) | N/A | **Behaviour Rules:** On click → `POST /claim-account`. On success → transitions to UC_2.8.4. |
| 3 | "Link Expired" state | Static Text + Button | N/A | **Displaying Rules:** Shown when JWT expired. **Behaviour Rules:** [Resend link] → `POST /public/resend-activation-link` → always HTTP 200 (anti-enumeration) → fires 3rd email if the address exists. |

### 4. BUSINESS RULES

| # | BR Code | Function | Description |
|---|---|---|---|
| 1 | `[CHR-11]` | Password Field Removed | Phase 2 no longer collects a password from the user — only phone number. (Cần xác nhận: where/how the account's login credential is now established — likely deferred entirely to Auth0 at Phase 3/UC_3.1 login, but this was not confirmed in the fetched excerpt.) |
| 2 | `[CHR-10]` | Split Resend Endpoints | `POST /resend-welcome` (Admin JWT, unchanged, BPS-only) vs. new `POST /public/resend-activation-link` (no auth, always returns HTTP 200 regardless of whether the email exists — anti-enumeration). |
| 3 | BR_2.1.1.3 (referenced, Table 1/2) | Reload/Deep-Link Behavior at Step 7.1 | Reload: stays on claim screen, keeps entered phone number, JWT remains valid if within 48h; if SIM provisioning fails in background at this point, no indication is shown (Ref BR_2.8.3.5 — full text not in fetched excerpt, **Cần xác nhận**). Deep-link: valid JWT → lands on 7.1 with valid `transaction_id`; invalid/missing → fallback to Step 1. |

### 5. MESSAGE LIST

| # | Message Code | Type | Message (EN) | Message (VN) | Trigger |
|---|---|---|---|---|---|
| 1 | (3rd resend email, code TBD) | Email | (Cần xác nhận — likely same content as original Claim Account email, re-sent) | (Cần xác nhận) | `POST /public/resend-activation-link` called |

---

## UC_2.8.4 — Phase 3: Provisioning & Redirect to Login

### 1. USE CASE SPECIFICATION TABLE

| Field | Content |
|---|---|
| **Use Case ID** | UC_2.8.4 |
| **Use Case Name** | Phase 3 — Provisioning & Redirect to Login |
| **Use Case Description** | This use case allows the System to finalize account provisioning (Auth0 + SIM) and hand the user off to the login screen, in order to complete the checkout-to-active-account journey. |
| **Actor(s)** | User, System, Auth0 |
| **Pre-Condition(s)** | Entered via `POST /claim-account` HTTP 200 (fresh) OR reopening an already-claimed link (resumed). |
| **Trigger** | Successful transition from UC_2.8.3. |
| **Post-Condition(s)** | Success: redirected to Auth0 login (Ref UC_3.1). Failure: OV-07 "Account Creation Failure" popup renders instead. |
| **Basic Flow** | 1. "Setting up your trading floor" animated interstitial renders (4-step sequence) — masks provisioning latency. 2. Backend completes Auth0 account creation + SIM account provisioning in parallel/sequence. 3. On success → redirect to Auth0 login screen. 4. On failure (after backend auto-retry exhausts) → OV-07 renders instead. |
| **List Screen** | Step 7 Phase 3 — "Setting up your trading floor" interstitial |
| **Exception Flow** | See BR_2.1.1.3 Table 1, Step 7.3 row: reload checks `account_status` — `Active_SIM` → redirect to login; `Guest` → keep showing provisioning/waiting state **indefinitely** (no frontend timeout) — failure handling fully delegated to backend auto-retry (Ref UC_2.8.2 §Step 3 Exception — not available in fetched excerpt, **Cần xác nhận** retry count/backoff policy). On exhaustion → OV-07. |

### 2. ACTIVITY FLOW

```
flowchart TD
    subgraph User
        A([Arrive at Phase 3<br/>from Phase 2 success or resumed link])
    end

    subgraph System
        B[Render Setting up your trading floor<br/>4-step animated interstitial]
        C[Backend: Auth0 account creation<br/>+ SIM provisioning]
        D{Result?}
        E[Redirect to Auth0 login screen<br/>Ref UC_3.1]
        F[Backend auto-retry<br/>Cần xác nhận: retry policy]
        G{Retries exhausted?}
        H[Render OV-07<br/>Account Creation Failure]
    end

    A --> B --> C --> D
    D -- Success --> E
    D -- Failure --> F --> G
    G -- No, retry again --> C
    G -- Yes, exhausted --> H
```

### 3. SCREEN DESCRIPTION

| # | Component | Type | Required? | Description |
|---|---|---|---|---|
| 1 | "Setting up your trading floor" interstitial | Static/Animated Display | N/A | **Displaying Rules:** 4-step animated sequence (Cần xác nhận: exact 4 step labels/copy — not detailed in fetched excerpt). Holds indefinitely if `account_status = 'Guest'` on reload — no frontend timeout. **Behaviour Rules:** N/A — purely visual masking layer. |
| 2 | OV-07 "Account Creation Failure" | Modal (Popup) | N/A | **Displaying Rules:** Renders only after backend auto-retry is exhausted. (Cần xác nhận: exact copy and whether it offers a support-contact CTA.) |

### 4. BUSINESS RULES

| # | BR Code | Function | Description |
|---|---|---|---|
| 1 | (Referenced) BR_2.1.1.3, Table 1, Step 7.3 | No Frontend Timeout at Phase 3 | Reload while `account_status = 'Guest'` → keeps showing wait state indefinitely. Reload while `account_status = 'Active_SIM'` → redirect to Auth0 login immediately. |
| 2 | (Referenced) UC_2.8.2 §Step 3 Exception | Backend Auto-Retry on Provisioning Failure | Full retry count/backoff policy not present in fetched excerpt — **Cần xác nhận with BAL or by re-fetching UC_2.8.2 directly**. |

### 5. MESSAGE LIST

| # | Message Code | Type | Message (EN) | Message (VN) | Trigger |
|---|---|---|---|---|---|
| 1 | OV-07 | Alert (Popup) | "Account Creation Failure" (Cần xác nhận: full copy) | (Cần xác nhận) | Backend auto-retry exhausted without successful provisioning |

---
---

## COMMON RULES REFERENCED IN THIS DOCUMENT

> Full definitions live in the project's own Common Rules doc (`stacktrading-docs.sotatek.works/docs/BA/Common_rule/common_rules`, v1.7). Not reproduced here in full — only the codes referenced throughout this SRS are listed, so you know which ones to look up before finalizing wording.

| Code | What it governs | Referenced in |
|---|---|---|
| CR-03 | Dropdown behavior | UC_2.1.3 (Primary Market) |
| CR-09 | Email/Phone field validation | UC_2.1.3, UC_2.6.1 |
| CR-11 | Numeric/Monetary value display | UC_2.7.1, UC_2.7.8 |
| CR-12 | UTM Attribution Capture (global, root layout) | UC_2.1.1, UC_2.6.1, UC_2.8.1 |
| `[CHR-6]` | `zip_code` field + `country_zip_requirements` table | UC_2.1.1, UC_2.6.1 |
| `[CHR-7]` | `promo_codes` table schema | UC_2.7.8 |
| `[CHR-8]` | Reversible vs. Irreversible refund/restitution path | UC_2.7.5, UC_2.8.1, UC_2.8.2 |
| `[CHR-9]` | Email-based 5-Failure payment lock | UC_2.8.1 |
| `[CHR-10]` | Split resend-welcome endpoints | UC_2.8.3 |
| `[CHR-11]` | 3-email split, password removed from Phase 2 | UC_2.8.2, UC_2.8.3 |
| `[CHR-20]` | Promo code pessimistic locking | UC_2.7.8, UC_2.8.1 |
| `[CHR-21]` | Double-payment gate | UC_2.8.1 |
| `[CHR-23]` | Skrill removed | UC_2.7.6 |
| `[CHR-38]` | Returning-user pricing branch | UC_2.6.1 |
| `[CHR-47]` | Sanctions pre-check & tax timing | UC_2.6.1 |
| `[CHR-49]` | Dynamic target/stop % rendering, fixed 60-day literal | UC_2.3 |
| `[CHR-51]` | Subtotal row in Order Summary | UC_2.7.8 |
| `[CHR-53]` | `is_founder` derivation via price comparison | UC_2.8.2 |
| `[CHR-55]` | Promo code 1-to-1 product mapping | UC_2.7.8 |
| `[CHR-65]` | Market data entitlement check (returning users) | UC_2.6.1 |
| `[CHR-68]` | T365 FX conversion via CurrencyLayer | UC_2.7.9 |
| `[CHR-87]` | Google Places Autocomplete + Address Validation | UC_2.6.1 |
| `[CHR-90]` | City cascades from Region | UC_2.6.1 |
| CR-20260720-003 | Everflow replaces Impact.com | UC_2.6.1, UC_2.8.1, UC_2.8.2 |
| CR-20260810-001 | Crypto/Triple-A pending removal | UC_2.7.5 |
| STAGE1-005 | Accepted race condition at Founder-500 boundary | UC_2.1.5, UC_2.8.1 |

---

## OPEN ITEMS — CẦN XÁC NHẬN VỚI BAL TRƯỚC KHI FREEZE DOC

1. Full exceptional-flow detail and business rules for **UC_2.8.2 onward** (BR_2.8.1.5 through end of UC_2.8.4) — **confirmed structural limitation**: three separate fetch attempts (including one with an explicit higher token limit) all cut off at the exact same point (BR_2.8.1.5 on the Step 6–7 page; BR_2.6.1.5 on the Step 0–5 page). This is a hard extraction limit on the docs portal for this tool, not an incidental truncation — content beyond this point could not be retrieved by Claude at all in this session. **Action:** open both `UC_2.1-2.6_v1` and `UC_2.7-2.8_v1` directly in a browser and manually copy/paste anything past BR_2.6.1.5 / BR_2.8.1.5 for the next revision.
2. **NEW — three previously-unknown business rules confirmed to exist but unreadable:** `BR_2.6.1.12` (Address Validation API error cases, for AQA), `BR_2.6.1.13` (returning-user pricing — full branch matrix), `BR_2.6.1.14` (market data entitlement check UI for returning users). These are forward-referenced by name in the live doc (meaning they definitely exist) but their content falls past the same truncation point as Item 1. `BR_2.6.1.13` in particular is high-priority — it governs pricing for every re-purchasing user, a common real-world case.
3. Exact wording (EN + VN) for every message code marked "(Cần xác nhận)" in the Message List tables — none were fabricated; all need to be pulled from `Common_rule/list-toast-popup`, `Common_rule/list_email`, and `Common_rule/list_pdf`.
4. `[CHR-8]` full refund/restitution logic (Reversible vs Irreversible paths) — only referenced, not detailed, in the fetched excerpts.
5. Backend auto-retry count/backoff for SIM provisioning failure at Phase 3 (UC_2.8.4) — still unresolved (falls inside the UC_2.8.2+ gap, Item 1).
6. Figma Wireframe Gap Log items #7, #10, #11 (see §0) — **still unverified** in this revision; per your instruction this pass used docs only, not Figma. Items #1, #3, #4 in that log are now independently **confirmed word-for-word** by this revision's fresh fetch (Skrill removal, password-field removal, email-based-not-IP lock) — see CHANGELOG.

import { LitElement, html, css } from "https://unpkg.com/lit-element/lit-element.js?module";

class B2500DCard extends LitElement {
  static get styles() {
    return css`
      :host {
        --bg:#050508;
        --panel:#16171c;
        --text:#e9edf3;
        --muted:#a4acb9;
        --cyan:#58d0ff;
        --cyan-soft:#3bbcf0;
        --divider:#2a2d36;
        --radius:22px;
        font-family: 'Inter', sans-serif;
        display:block;
      }

      .phone {
        width:100%;
        max-width:600px;
        margin:0 auto;
        background:linear-gradient(180deg,#0c0d12,#08090d);
        border-radius:28px;
        padding:18px 14px 26px;
        box-shadow:0 30px 80px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.035);
        border:1px solid #12131a;
        box-sizing:border-box;
      }

      .device {
        display:flex;flex-direction:column;align-items:center;gap:14px;padding:6px 0 14px
      }
      .device .unit {
        width:130px;height:120px;border-radius:18px;
        background:linear-gradient(135deg,#3b3f48 0%,#2b2f37 45%,#22262d 100%);
        box-shadow: inset 0 2px 0 rgba(255,255,255,.05), inset 0 -8px 16px rgba(0,0,0,.45);
        position:relative;
      }
      .unit:before {
        content:"";position:absolute;left:50%;top:10px;transform:translateX(-50%);
        width:10px;height:85px;border-radius:6px;
        background:linear-gradient(#0f1116,#0f1116) padding-box,
                   linear-gradient(#2b2e36,#101216) border-box;
        border:1px solid transparent;
      }
      .unit:after {
        content:"";position:absolute;left:50%;top:24px;transform:translateX(-50%);
        width:3px;height:56px;border-radius:3px;background:#5be5bf;
        box-shadow:0 0 8px #5be5bf,0 0 18px #5be5bf;
      }

      .grid {
        display:grid;
        grid-template-columns: 1fr 1fr;
        gap:14px;
      }

      .solar {
        grid-column: 1 / -1;
        padding:18px;
      }

      .battery-card {
        grid-row: span 2;
        display:flex;
        flex-direction:column;
        justify-content:center;
      }

      .card {
        background:var(--panel);
        border:1px solid #1d1f27;
        border-radius: var(--radius);
        padding:16px;
        box-sizing:border-box;
      }

      .card.flat{ box-shadow:none; padding:0; overflow:hidden }

      .title {
        display:flex; align-items:center; gap:10px;
        font-weight:600; color:var(--text);
      }

      .right-big {
        margin-left:auto; font-weight:700; font-size:30px; color:var(--cyan);
      }

      .big-num{ font-size:24px; color:var(--cyan); font-weight:700; }
      .muted{ color:var(--muted) }
      .subtitle{ color:var(--muted); font-size:13px; margin-top:10px }

      .barwrap{ margin-top:14px; display:flex; gap:12px; align-items:center; }
      .bar{
        background:#0e0f14; border:1px solid var(--divider);
        border-radius:12px; height:6px; flex:1; position:relative; overflow:hidden;
      }
      .bar .fill{
        position:absolute; left:0; top:0; bottom:0; width:0%;
        background:linear-gradient(90deg,var(--cyan-soft),var(--cyan));
        border-radius:12px;
        transition: width .6s ease;
      }
      .bar.r .fill{
        right:0; left:auto;
        background:linear-gradient(270deg,var(--cyan-soft),var(--cyan));
      }
      .barlabels{ display:flex; justify-content:space-between; margin-top:8px; font-weight:600; color:var(--cyan); }
      .barlabels .hint{ color:var(--muted); font-weight:500; font-size:12px; margin-top:2px }

      .battery{
        display:flex; align-items:center; justify-content:center; padding:10px 0 4px;
      }
      .ring{
        width:170px; height:170px; border-radius:50%;
        background: conic-gradient(var(--cyan) 0 75%, #2a2d36 75% 100%);
        display:grid; place-items:center;
      }
      .inner{
        width:132px; height:132px; border-radius:50%;
        background: radial-gradient(120px 120px at 50% 45%, #0d0f15, #0b0d12);
        display:grid; place-items:center;
        box-shadow: inset 0 2px 8px rgba(0,0,0,.6);
      }
      .kwh{ font-size:20px; font-weight:800; color:var(--cyan); }
      .percent{ color:var(--muted); margin-top:2px; font-weight:600 }

      .row{
        display:flex; align-items:center; justify-content:space-between; gap:10px;
        padding:18px; border-radius:var(--radius);
        background:var(--panel); border:1px solid #1d1f27;
      }
      .row .left{ display:flex; align-items:center; gap:12px; }
      .row .right{ color:var(--muted); font-weight:600; display:flex; align-items:center; }
      .chev{ width:10px; height:10px; border-right:2px solid var(--muted); border-top:2px solid var(--muted); transform:rotate(45deg); margin-left:6px; }

      .divider{ height:1px; background:var(--divider); margin:12px 0 0; }

      .row .right ha-select,
      .row .right ha-switch {
        --mdc-theme-primary: var(--cyan);
        min-width: 140px;
      }

      @media(max-width:700px){
        .grid{grid-template-columns:1fr}
        .battery-card{grid-row:auto}
      }
    `;
  }

  constructor() {
    super();
  }

  setConfig(config) {
    if (!config.device) {
      throw new Error("You need to define a device!");
    }
    this.config = config;
  }

  set hass(hass) {
    this._hass = hass;
    if (!this.config) return;

    const device = this.config.device;

    const getState = (entity) => hass.states[entity]?.state || 0;

    this._solarPower = getState(`sensor.${device}_total_input_power`);
    this._p1 = getState(`sensor.${device}_input_1_power`);
    this._p2 = getState(`sensor.${device}_input_2_power`);
    this._outputPower = getState(`sensor.${device}_total_output_power`);
    this._batteryPercent = getState(`sensor.${device}_battery_percentage`);
    this._batteryKwh = getState(`sensor.${device}_battery_capacity`)/1000;
    this._productionToday = getState(`sensor.${device}_daily_pv_charging`)/1000;

    this.requestUpdate();
  }

  render() {
    const p1Pct = Math.round((this._p1 / 400) * 100);
    const p2Pct = Math.round((this._p2 / 400) * 100);

    const selectEntity = this._hass.states[`select.${this.config.device}_charging_mode`];
    const switchEntity = this._hass.states[`switch.${this.config.device}_adaptive_mode`];

    // Übersetzungs-Tabelle für die Select-Optionen
    const translations = {
      "Simultaneous Charging/Discharging": "Gleichzeitiges Laden/Entladen",
      "Fully Charge Then Discharge": "Vollständig Laden, dann Entladen"
    };

    return html`
      <div class="phone">
        <div class="device"><div class="unit"></div></div>

        <section class="grid">
          <!-- Solar -->
          <article class="card solar">
            <div class="title">
              ☀️ <span>Solarenergie</span>
              <div class="right-big">${this._solarPower}w</div>
            </div>
            <div class="barwrap">
              <div class="bar p1"><div class="fill" style="width:${p1Pct}%"></div></div>
              <div class="bar p2 r"><div class="fill" style="width:${p2Pct}%"></div></div>
            </div>
            <div class="barlabels">
              <div>${this._p1}W<div class="hint">P1</div></div>
              <div style="text-align:right">${this._p2}W<div class="hint">P2</div></div>
            </div>
          </article>

          <!-- Output -->
          <article class="card">
            <div class="title">⚡️︎ Ausgang</div>
            <div class="subtitle">Echtzeitleistung</div>
            <div class="big-num">${this._outputPower}w</div>
          </article>

          <!-- Battery -->
          <article class="card battery-card">
            <div class="title">🔋 Batterie</div>
            <div class="battery">
              <div class="ring" style="background:conic-gradient(var(--cyan) 0 ${this._batteryPercent}%, #2a2d36 ${this._batteryPercent}% 100%)">
                <div class="inner">
                  <div style="text-align:center">
                    <div class="kwh">${Number(this._batteryKwh).toFixed(2)}kWh</div>
                    <div class="percent">${this._batteryPercent}%</div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <!-- Production -->
          <article class="card">
            <div class="title">📊 Stromerzeugung</div>
            <div class="subtitle">Heute</div>
            <div class="big-num">${Number(this._productionToday).toFixed(2)}kWh</div>
          </article>

          <!-- Settings -->
          <div class="card flat" style="grid-column:1 / -1">
            <!-- Lademodus -->
            <div class="row">
              <div class="left">⚙️<div style="font-weight:600">Lademodus</div></div>
              <div class="right">
                ${selectEntity
                  ? html`
                      <ha-select
                        .value=${selectEntity.state}
                        @selected=${(e) => {
                          const val = e.target.value;
                          this._hass.callService("select", "select_option", {
                            entity_id: selectEntity.entity_id,
                            option: val
                          });
                        }}
                      >
                        ${(selectEntity.attributes?.options || []).map(
                          (opt) => html`<mwc-list-item value=${opt}>
                            ${translations[opt] || opt}
                          </mwc-list-item>`
                        )}
                      </ha-select>
                    `
                  : html`<span>-</span>`}
              </div>
            </div>
            <div class="divider"></div>
            <!-- Entlademodus -->
            <div class="row" style="border-radius:0 0 var(--radius) var(--radius)">
              <div class="left">🔌<div style="font-weight:600">Entlademodus automatisch</div></div>
              <div class="right">
                ${switchEntity
                  ? html`
                      <ha-switch
                        .checked=${switchEntity.state === "on"}
                        @change=${(e) => {
                          const service = e.target.checked ? "turn_on" : "turn_off";
                          this._hass.callService("switch", service, {
                            entity_id: switchEntity.entity_id
                          });
                        }}
                      ></ha-switch>
                    `
                  : html`<span>-</span>`}
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  }

  getCardSize() { return 3; }
}

customElements.define("b2500d-card", B2500DCard);

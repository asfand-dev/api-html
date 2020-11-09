class Editor {
  constructor() {
    this.selectedId = null;
    this.appliedProps = {};
    this.history = {};
    this.assetsRoot = 'https://cdn.jsdelivr.net/npm/api-html@1.1.1/themes/compact';

    this.attachEvents();
    this.attachPopup();
    this.attachToolTips();
    this.loadLibraries();
  }

  generateBackgroundPatterns({ title, value, id }) {
    const { isActive = true, opacity = 0, pattern, url: patternUrl = '' } = value;
    const images = ['1.jpg', '2.jpg', '3.jpg', '4.svg', '5.svg', '6.svg', '7.svg', '8.svg', '9.svg', '10.svg'];
    const getUrl = (img) => `${this.assetsRoot}/assets/img/patterns/${img}`;

    return `
      <div style="margin-bottom: 20px">
        <label>Show Pattern <input ${isActive ? 'checked' : ''} class="uk-checkbox background-pattern-active" style="margin-left: 10px" type="checkbox"></label>
        <p>Opacity</p>
        <span>0%</span>
        <input type="range" value="${opacity}" min="0" max="100" class="background-pattern-opacity" style="width: calc(100% - 80px)" />
        <span>100%</span>
        <p>Patterns</p>
        <div class="uk-margin background-pattern" id="${id}">
          ${images.map(e => `
            <div
              class="background-pattern-block ${e === pattern ? 'background-pattern-block-selected' : ''}"
              data-value="${e}"
              style="
                background-image: linear-gradient(to bottom, #888, rgba(0, 0, 0, 0.4)), url(${getUrl(e)});
              "
            ></div>
          `).join('')}
        </div>
        <p>Or</p>
        <input class="uk-input background-pattern-url" type="text" value="${patternUrl}" placeholder="Enter pattern url">
        <p style="font-size: 10px; margin-top: 5px;">Keep it empty, if you want to use the above patterns</p>
      </div>
    `;
  }

  generateUnits() {
    return `
      <div class="zama-chips" style="display: none;">
        <a href="#">px</a>
        <a href="#">%</a>
        <a href="#">em</a>
        <a href="#">rem</a>
        <a href="#">cm</a>
        <a href="#">in</a>
        <a href="#">mm</a>
        <a href="#">pt</a>
        <a href="#">vh</a>
        <a href="#">vw</a>
      </div>
    `;
  }

  generateTextField({ title, value: _value = {}, id, isUnit = true }) {
    const { value = 0, unit = 'px', hint = '' } = _value || {};
    return `
      <div class="uk-margin zama-units">
        <label class="uk-form-label">
          ${title}
          ${hint ? `
            <span uk-icon="info" style="float: right;"></span>
            <div uk-dropdown="mode: click; pos: bottom-right" style="max-width: 150px">${hint}</div>    
          ` : ''}
        </label>
        <div class="uk-inline" id="${id}">
          ${ isUnit ? `<a class="uk-form-icon uk-form-icon-flip zama-unit" href="#" uk-icon="icon: chevron-down"><span class="value">${unit}</span></a>` : '' }
          <input class="uk-input" type="text" value="${value}" placeholder="Enter ${title}">
        </div>
        ${this.generateUnits()}
      </div>
    `;
  }

  generateSelectField({ title, value: _value = {}, id }) {
    const { value: selectedValue = '', options = [], hint = '' } = _value || {};
    return `
      <div class="uk-margin" id="${id}">
        <label class="uk-form-label">
          ${title}
          ${hint ? `
            <span uk-icon="info" style="float: right;"></span>
            <div uk-dropdown="mode: click; pos: bottom-right" style="max-width: 150px">${hint}</div>    
          ` : ''}
        </label>
        <select class="uk-select">
          ${options.map(([value, label]) => `<option value="${value}"${value === selectedValue ? ' selected' : ''}>${label || value}</option>`).join('')}
        </select>
      </div>
    `;
  }

  generateFontField({ title, value: _value = {}, id }) {
    const { value = '', unit = 'px', isBold = false, isItalic = false, isUnderline = false, hint = '' } = _value || {};
    return `
        <div class="uk-margin zama-units" id="${id}">
          <label class="uk-form-label">
            ${title}
            ${hint ? `
              <span uk-icon="info" style="float: right;"></span>
              <div uk-dropdown="mode: click; pos: bottom-right" style="max-width: 150px">${hint}</div>    
            ` : ''}
          </label>

          <div class="uk-inline">
            <a class="uk-form-icon uk-form-icon-flip zama-unit" href="#" uk-icon="icon: chevron-down"><span class="value">${unit}</span></a>
            <input class="uk-input" type="number" value="${value}" placeholder="Enter ${title}">
          </div>
          <div style="font-size: 10px; margin-top: 10px;">
            <label><input ${isBold ? 'checked' : ''} class="uk-checkbox is-bold" style="margin-left: 10px" type="checkbox"> Bold</label>
            <label><input ${isItalic ? 'checked' : ''} class="uk-checkbox is-italic" style="margin-left: 10px" type="checkbox"> Italic</label>
            <label><input ${isUnderline ? 'checked' : ''} class="uk-checkbox is-underline" style="margin-left: 10px" type="checkbox"> Underline</label>
          </div>
          ${this.generateUnits()}
        </div>
    `;
  }

  generatePaddingField({ title, value = {}, id }) {
    const { top = 0, left = 0, right = 0, bottom = 0, unit = 'px', hint = '' } = value;

    return `
      <div class="uk-margin field zama-units" id="${id}">
        <label class="uk-form-label">
          ${title}
          ${hint ? `
            <span uk-icon="info" style="float: right;"></span>
            <div uk-dropdown="mode: click; pos: bottom-right" style="max-width: 150px">${hint}</div>    
          ` : ''}
        </label>
        <div class="field-padding">
          Unit: <a class="zama-unit" href="#" uk-icon="icon: chevron-down" style="float: right"><span class="value">px</span></a>
          <span uk-icon="icon: plus; ratio: 3" style="color: #d4d3d3"></span>
          <input class="field-padding-top" type="number" value="${top}"/>
          <input class="field-padding-left" type="number" value="${left}"/>
          <input class="field-padding-right" type="number" value="${right}"/>
          <input class="field-padding-bottom" type="number" value="${bottom}"/>
        </div>
        ${this.generateUnits()}
      </div>
    `;
  }

  generateColorField({ title, value: _value = '', id }) {
    const { value = '', hint = '' } = _value;
    return `
      <div class="uk-margin" id="${id}">
        <label class="uk-form-label">
          ${title}
          ${hint ? `
            <span uk-icon="info" style="float: right;"></span>
            <div uk-dropdown="mode: click; pos: bottom-right" style="max-width: 150px">${hint}</div>    
          ` : ''}
        </label>
        <div class="uk-form-controls">
          <input class="uk-input color-picker" value="${value}" placeholder="Enter ${title}">
        </div>
      </div>
    `
  }

  getFieldValue(type) {
    if (type === PROPS.PADDING || type === PROPS.MARGIN || type === PROPS.BORDER_RADIUS) {
      const top = $(`#field-id-${type} .field-padding-top`).val()
      const left = $(`#field-id-${type} .field-padding-left`).val()
      const right = $(`#field-id-${type} .field-padding-right`).val()
      const bottom = $(`#field-id-${type} .field-padding-bottom`).val()
      const unit = $(`#field-id-${type} .zama-unit .value`).text()
      return { top, left, right, bottom, unit };
    } else if (type === PROPS.BACKGROUND_PATTERN) {
      const pattern = $('.background-pattern-block-selected').attr('data-value');
      const opacity = $('.background-pattern-opacity').val();
      const url = $('.background-pattern-url').val();
      const isActive = $('.background-pattern-active')[0].checked;

      return { isActive, opacity, pattern, url };
    } else if (type === PROPS.TEXT_CASE) {
      const value = $(`#field-id-${type} select`).val()
      return { value };
    } else if (type === PROPS.FONT_SIZE) {
      const value = $(`#field-id-${type} input`).val();
      const isBold = $(`#field-id-${type} .is-bold`)[0].checked;
      const isItalic = $(`#field-id-${type} .is-italic`)[0].checked;
      const isUnderline = $(`#field-id-${type} .is-underline`)[0].checked;
      return { value, isBold, isItalic, isUnderline };
    } else {
      const value = $(`#field-id-${type} input`).val()
      const unit = $(`#field-id-${type} .zama-unit .value`).text()
      return { value, unit };
    }
  }

  generateFields({ props, values = {} }) {
    let onCompleteStack = [];

    let html = props.map(e => {
      let html = '';

      if (e === PROPS.PADDING) {
        html = this.generatePaddingField({
          id: `field-id-${PROPS.PADDING}`,
          title: 'Padding',
          value: values[PROPS.PADDING],
        });
      } else if (e === PROPS.MARGIN) {
        html = this.generatePaddingField({
          id: `field-id-${PROPS.MARGIN}`,
          title: 'Margin',
          value: values[PROPS.MARGIN],
        });
      } else if (e === PROPS.BORDER_RADIUS) {
        html = this.generatePaddingField({
          id: `field-id-${PROPS.BORDER_RADIUS}`,
          title: 'Border Rounds',
          value: values[PROPS.BORDER_RADIUS],
        });
      } else if (e === PROPS.IMAGE_URL) {
        html = this.generateTextField({
          id: `field-id-${PROPS.IMAGE_URL}`,
          title: 'Image URL',
          value: values[PROPS.IMAGE_URL],
          isUnit: false,
        });
      } else if (e === PROPS.WIDTH) {
        html = this.generateTextField({
          id: `field-id-${PROPS.WIDTH}`,
          title: 'Width',
          value: values[PROPS.WIDTH],
        });
      } else if (e === PROPS.MAX_WIDTH) {
        html = this.generateTextField({
          id: `field-id-${PROPS.MAX_WIDTH}`,
          title: 'Maximum Width',
          value: values[PROPS.MAX_WIDTH],
        });
      } else if (e === PROPS.MIN_WIDTH) {
        html = this.generateTextField({
          id: `field-id-${PROPS.MIN_WIDTH}`,
          title: 'Minimum Width',
          value: values[PROPS.MIN_WIDTH],
        });
      } else if (e === PROPS.HEIGHT) {
        html = this.generateTextField({
          id: `field-id-${PROPS.HEIGHT}`,
          title: 'Height',
          value: values[PROPS.HEIGHT],
        });
      } else if (e === PROPS.MAX_HEIGHT) {
        html = this.generateTextField({
          id: `field-id-${PROPS.MAX_HEIGHT}`,
          title: 'Maximum Height',
          value: values[PROPS.MAX_HEIGHT],
        });
      } else if (e === PROPS.MIN_HEIGHT) {
        html = this.generateTextField({
          id: `field-id-${PROPS.MIN_HEIGHT}`,
          title: 'Minimum Height',
          value: values[PROPS.MIN_HEIGHT],
        });
      } else if (e === PROPS.FONT_SIZE) {
        html = this.generateFontField({
          id: `field-id-${PROPS.FONT_SIZE}`,
          title: 'Font Size',
          value: values[PROPS.FONT_SIZE],
        });
      } else if (e === PROPS.TEXT_COLOR) {
        html = this.generateColorField({
          id: `field-id-${PROPS.TEXT_COLOR}`,
          title: 'Text Color',
          value: values[PROPS.TEXT_COLOR]
        });

        onCompleteStack.push(() => {
          $('.color-picker').spectrum({
            type: "component",
            showPalette: false,
          });
        })
      } else if (e === PROPS.BACKGROUND_COLOR) {
        html = this.generateColorField({
          id: `field-id-${PROPS.BACKGROUND_COLOR}`,
          title: 'Background Color',
          value: values[PROPS.BACKGROUND_COLOR]
        });

        onCompleteStack.push(() => {
          $('.color-picker').spectrum({
            type: "component",
            showPalette: false,
          });
        })
      } else if (e === PROPS.BACKGROUND_PATTERN) {
        html = this.generateBackgroundPatterns({
          id: `field-id-${PROPS.BACKGROUND_PATTERN}`,
          title: 'Background Patterns',
          value: values[PROPS.BACKGROUND_PATTERN],
        });

        onCompleteStack.push(() => {
          $('.background-pattern-block').off('click');
          $('.background-pattern-block').click(function() {
            $('.background-pattern-block-selected').removeClass('background-pattern-block-selected');
            $(this).addClass('background-pattern-block-selected');
            $('.background-pattern').trigger('change');
          });
        });
      } else if (e === PROPS.TEXT_CASE) {
        html = this.generateSelectField({
          id: `field-id-${PROPS.TEXT_CASE}`,
          title: 'Transform Text Case',
          value: {
            value: values[PROPS.TEXT_CASE].value,
            options: [
              ['none', 'Normal'],
              ['uppercase', 'Upper Case'],
              ['capitalize', 'Capitalize'],
              ['lowercase', 'Lower Case']
            ],
          },
        });
      }

      return html;
    }).join('');

    onCompleteStack.push(() => {
      $('.zama-unit').off('click');
      $('.zama-unit').click(function() {
        $(this).parents('.zama-units').find('.zama-chips').toggle();
      });

      $('.zama-chips a').click(function() {
        $(this).parents('.zama-units').find('.zama-unit .value').text($(this).text());
        $(this).parents('.zama-units').find('.zama-chips').hide();
        $('.zama-unit').first().trigger('change');
      });
    });

    return { onCompleteStack, html };
  }

  generatePopup({ title, items }) {
    return `
      ${title ? `<h4>${title}</h4>` : ''}
      <form class="uk-form-stacked" onsubmit="e => e.preventDefault()">
        ${items}
        <div style="float: right">
          <button class="uk-button uk-button-small uk-button-default button-reset" type="button">Reset</button>
          <button class="uk-button uk-button-small uk-button-primary button-apply" type="button">Apply</button>
        </div>
      </form>
    `;
  }

  createPopup() {
    // Get the properties of the selected element
    const { id = '', props = [], title = '', values = {} } = this.getData();
    
    // Generate all the fields for the currently selected element
    const { html, onCompleteStack } = this.generateFields({ id, props, values });

    // Generate html for popup modal
    const popupHTML = this.generatePopup({ title, items: html });
    
    // Add the generated html next to the selected element
    this.setPopup(popupHTML);

    // Show the popup modal
    this.showPopup();

    // Attach a handler which will be triggered on apply click
    $('.zama-popup .button-apply').off('click');

    // Apply style on change of all the inputs inside the form
    $('.zama-popup input, .zama-popup .zama-unit, .background-pattern, .zama-popup select').change(() => this.applyStyle());

    // Apply style on clicking the apply button
    $('.zama-popup .button-apply').click(() => {
      this.applyStyle();
      this.hidePopup();
      // Deselect the pre-selected element
      $('.zama-selected').removeClass('zama-selected');
    });

    // Attach handler for reseting to the default values
    $('.zama-popup .button-reset').off('click');
    $('.zama-popup .button-reset').click(() => this.resetDefaultValues());

    // Attach the close handler
    $('.zama-popup .button-close').off('click');
    $('.zama-popup .button-close').click(() => {
      this.hidePopup();
      // Deselect the pre-selected element
      $('.zama-selected').removeClass('zama-selected');
    });

    // Execute the stacked functions after the dom generation
    onCompleteStack.forEach((e) => e());
  }

  /**
   * Reset the form to the default values
  */
  resetDefaultValues() {
    const { id } = this.getData();

    // Remove already existing style element, to not override with the newly applying style.
    $(`style#${id}`).remove();
    
    // Remove the values object from history object
    delete this.history[id];
    
    // Recreate the popup to get the default values
    this.createPopup();
  }

  /**
   * Generate css rules for the effected style changes
  */
  generateCssRules({ values, cssSelector }) {
    return values.map(({ type, values }) => {
      if (type === PROPS.MAX_WIDTH) {
        const { value = 0, unit = 'px' } = values;
        return `max-width: ${value}${unit} !important`;
      } else if (type === PROPS.MIN_WIDTH) {
        const { value = 0, unit = 'px' } = values;
        return `min-width: ${value}${unit} !important`;
      } else if (type === PROPS.WIDTH) {
        const { value = 0, unit = 'px' } = values;
        return `width: ${value}${unit} !important`;
      } else if (type === PROPS.MIN_HEIGHT) {
        const { value = 0, unit = 'px' } = values;
        return `min-height: ${value}${unit} !important`;
      } else if (type === PROPS.HEIGHT) {
        const { value = 0, unit = 'px' } = values;
        return `height: ${value}${unit} !important`;
      } else if (type === PROPS.MAX_HEIGHT) {
        const { value = 0, unit = 'px' } = values;
        return `max-height: ${value}${unit} !important`;
      } else if (type === PROPS.PADDING) {
        const { top = 0, left = 0, right = 0, bottom = 0, unit = 'px' } = values;
        return `padding: ${top}${unit} ${right}${unit} ${bottom}${unit} ${left}${unit} !important`;
      } else if (type === PROPS.MARGIN) {
        const { top = 0, left = 0, right = 0, bottom = 0, unit = 'px' } = values;
        return `margin: ${top}${unit} ${right}${unit} ${bottom}${unit} ${left}${unit} !important`;
      } else if (type === PROPS.BORDER_RADIUS) {
        const { top = 0, left = 0, right = 0, bottom = 0, unit = 'px' } = values;
        return `border-radius: ${top}${unit} ${right}${unit} ${bottom}${unit} ${left}${unit} !important`;
      } else if (type === PROPS.IMAGE_URL) {
        const { value } = values;

        if (value) {
          $(cssSelector).attr('src', value);
        }

        return;
      }  else if (type === PROPS.TEXT_CASE) {
        const { value } = values;
        return `text-transform: ${value} !important`;
      } else if (type === PROPS.TEXT_COLOR) {
        const { value } = values;
        return `color: ${value} !important`;
      } else if (type === PROPS.BACKGROUND_COLOR) {
        const { value } = values;
        return `background-color: ${value} !important`;
      } else if (type === PROPS.FONT_SIZE) {
        const { value = 14, unit = 'px', isBold, isItalic, isUnderline } = values;
        const css = [`font-size: ${value}${unit} !important`];
        
        if (isBold) {
          css.push(`font-weight: 500 !important`);
        } else {
          css.push(`font-weight: normal !important`);
        }

        if (isItalic) {
          css.push(`font-style: italic !important`);
        } else {
          css.push(`font-style: normal !important`);
        }

        if (isUnderline) {
          css.push(`text-decoration: underline !important`);
        } else {
          css.push(`text-decoration: none !important`);
        }

        return css.join(';');
      } else if (type === PROPS.BACKGROUND_PATTERN) {
        const { isActive, opacity, pattern, url } = values;
        let cssRule = `background-image: linear-gradient(to bottom, #888, rgba(0, 0, 0, ${parseInt(opacity) / 100})), url(${this.assetsRoot}/assets/img/patterns/${pattern})`
        
        if (url) {
          cssRule = `background-image: linear-gradient(to bottom, #888, rgba(0, 0, 0, ${parseInt(opacity) / 100})), url(${url})`
        }

        if (!isActive) {
          cssRule = 'background-image: none !important'
        }

        return cssRule;
      }

      return '';
    }).join('; ');
  }

  /**
   * A handler function which will be exectuted once apply has been clicked
  */
  applyStyle() {
    const { id, props, cssSelector } = this.getData();
    const values = props.map(e => ({type: e, values: this.getFieldValue(e)}));
    let cssRules = this.generateCssRules({ values, cssSelector });
    cssRules = `${cssSelector} { ${cssRules} }`;

    // Remove already existing style element, to not override with the newly applying style.
    $(`style#${id}`).remove();

    // Create style element and add css rules for the selected element
    const style = document.createElement('style')            
    style.id = id;
    style.innerText = cssRules;
    $('body').append(style);

    // Adding the changes to the history for later processing
    this.history[id] = {
      ...this.getData(),
      cssRules,
      // Override the new values over default values
      values: values.reduce((acc, {type, values}) => {
        acc[type] = values;
        return acc;
      }, {}),
    }

    this.postMessageToParentWindow();
  }

  /**
   * Load the external dependencies for color picker
   * */
  loadLibraries() {
    const script = document.createElement('script');
    const link = document.createElement('link');

    script.src = "https://cdn.jsdelivr.net/npm/spectrum-colorpicker2/dist/spectrum.min.js";
    link.href = "https://cdn.jsdelivr.net/npm/spectrum-colorpicker2/dist/spectrum.min.css";
    link.rel = "stylesheet";

    document.body.append(link);
    document.body.append(script);
  }

  /**
   * Get the properties of the currently selected element
  */
  getData(id) {
    // Check the element in history, If its already updated
    let element = this.history[id || this.selectedId];

    if (element) {
      return element;
    }

    // The element is selected for first time so get the default values
    return elements[id || this.selectedId] || {};
  }

  /**
   * Get the jQuery object of currently selected item
  */
  getSelectedEle(id) {
    return $(`.zama-selected[data-zama-id="${id || this.selectedId}"]`);
  }

  /**
   * Attach the tooltip to all the selectable elements
  */
  attachToolTips() {
    $('.zama-select').toArray().forEach(e => {
      const { tooltipAlign = 'top', title = 'Click to Edit' } = this.getData($(e).attr('data-zama-id'));
      $(e).attr('uk-tooltip', `title:${title}; pos: ${tooltipAlign}`)
    });
  }

  /**
   * Attach the click event to the selectable elements
  */
  attachEvents() {
    $('.zama-select').click((e) => {
      e.preventDefault();
      e.stopPropagation();

      let target = e.target;

      // check if the clicked element is the inner element
      if (!$(target).hasClass('zama-select')) {
        const [firstEle = null] = $(target).parents('.zama-select');
        if (!firstEle) return;
        target = $(firstEle);
      }

      // Set the selectedId for using in other places
      this.selectedId = $(target).attr('data-zama-id');
      
      // Deselect the pre-selected element
      $('.zama-selected').removeClass('zama-selected');
      
      // Add a class to the selected element
      $(target).addClass('zama-selected');
      
      // Remove the old popup
      this.setPopup('');

      // Render the popup on the page
      this.createPopup()
    });
  }

  /**
   * Append the popup container to the body
  */
  attachPopup() {
    $('body').append('<div class="zama-popup"></div>');
  }

  /**
   * Show and Set the position of the popup
  */
  showPopup() {
    const { align = 'bottom center', distance = {} } = this.getData();
    // Possible values for alignV: top, center, bottom, above
    // Possible values for alignH: left, center right
    const [alignV = 'bottom', alignH = 'center'] = align.split(' ');
    const { x = 0, y = 0 } = distance;

    let { left = 0, top = 0 } = this.getSelectedEle().offset();
    const [eWidth, eHeight] = [this.getSelectedEle().outerWidth(), this.getSelectedEle().outerHeight()];
    const [popupWidth, popupHeight] = [$('.zama-popup').outerWidth(), $('.zama-popup').outerHeight()];
    
    if (alignV === 'bottom') {
      top += eHeight + 2;
    } else if (alignV === 'center') {
      top += eHeight / 2;
    } else if (alignV === 'top') { 
    } else if (alignV === 'above') {
      top -= popupHeight + 2; 
    }

    if (alignH === 'left') {
      left -= popupWidth + 2;
    } else if (alignH === 'center') {
      left += ((eWidth / 2) - (popupWidth / 2));
    } else if (alignH === 'right') {
      left += eWidth + 2;
    }

    if (align === 'pre' || left < 0) {
      left = 0;
    }

    if (align === 'pre' || top < 0) {
      top = 0;
    }


    $('.zama-popup').css('left', left  + x);
    $('.zama-popup').css('top', top + y);

    $('.zama-popup').show();
  }

  /**
   * Set the inner content of a modal
  */
  setPopup(html) {
    html += `<span uk-icon="close" class="button-close" style="position: absolute; top: 6px; right: 6px;"></span>`; 
    $('.zama-popup').html(html);
  }

  /**
   * Hide the popup
  */
  hidePopup() {
    $('.zama-popup').hide();
  }

  postMessageToParentWindow() {
    let allCssRules = Object.keys(this.history).map(e => this.history[e].cssRules).join('\n');
    allCssRules = `<style>\n${allCssRules}\n</style>`;
    if (window.opener) window.opener.postMessage(allCssRules, '*');
  }
}

const editor = new Editor();
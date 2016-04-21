var createElement = require('../createElement');
var expect = require('expect');

describe('createElement', () => {
  it('produces a self-closing tag for void elements');

  it('throws an error when a void element is given children');

  it('produces both start and end tags for non-void tags', () => {
    const div = createElement('div', null, 'hi').render();
    const markup = div.trim();
    const startTag = '<div>';
    const endTag = '</div>';

    expect(markup.indexOf(startTag)).toBe(0);
    expect(markup.indexOf(endTag)).toBe(markup.length - endTag.length);
  });

  it('accepts a child string', () => {
    const oneStringChildHtml = createElement('span', null, 'hihi').render();
    const spanContents = oneStringChildHtml.substring(
      oneStringChildHtml.indexOf('<span>') + 1,
      oneStringChildHtml.lastIndexOf('</span>')
    );

    expect(spanContents).toContain('hihi');
  });

  it('accepts a child element', () => {
    const oneElementChildHtml = createElement('div', null, createElement('span', null, 'whatevs')).render();
    const divContents = oneElementChildHtml.substring(
      oneElementChildHtml.indexOf('<div>') + 1,
      oneElementChildHtml.lastIndexOf('</div>')
    );

    expect(divContents).toContain('<span>', 'whatevs', '</span>');
  });

  it('accepts multiple children', () => {
    const children = [
      createElement('span', null, 'ok'),
      "i'm a string yo",
      createElement('img', null),
    ];
    const parent = createElement('div', null, ...children).render();
    function htmlFrom(input) {
      return typeof input === 'string' ? input : input.render();
    }

    expect(parent).toContain(...children.map((child) => htmlFrom(child)));
  });

  it('accepts an attributes object', () => {
    const attributes = {
      href: 'http://google.com',
      'data-thing': 'whatevs',
    };
    const el = createElement('a', attributes, 'Google').render();

    expect(el).toContain('<a href="http://google.com" data-thing="whatevs">');
  });

  it('accepts true boolean attributes', () => {
    const attributes = { hidden: true };
    const el = createElement('div', attributes, 'blah!').render();

    expect(el).toEqual('<div hidden="hidden">blah!</div>');
  });

  it('accepts false boolean attributes', () => {
    const attributes = { hidden: false };
    const el = createElement('div', attributes, 'blah!').render();

    expect(el).toEqual('<div>blah!</div>');
  });

  it('accepts a "class" attribute as "className"', () => {
    const el = createElement('div', { className: 'potato skins' }).render();

    expect(el).toContain(' class=');
  });

  it('accepts a "for" attribute as "htmlFor"', () => {
    const el = createElement('div', { htmlFor: 'onion skins' }).render();

    expect(el).toContain(' for=');
  });

  it('accepts tag-type string', () => {
    const div = createElement('div', null, 'ok').render();

    expect(div).toContain('<div>', 'ok', '</div>');
  });

  it('accepts array of Elements as child', () => {
    const div = createElement('div', null, [
      createElement('span'),
      createElement('em'),
      createElement('i'),
    ]).render();

    expect(div.replace(/\s+/, '')).toContain('</span><em></em><i>');
  });

  const rawText = '<i>beep</i>';

  it('accepts raw HTML child', () => {
    const span = createElement('span', { dangerouslySetInnerHTML: { __html: rawText } }, 'boop');

    expect(span.render()).toContain(rawText);
  });

  it('escapes non-HTML child text', () => {
    const span = createElement('span', null, rawText);

    expect(span.render()).toNotContain(rawText);
  });

  it('ignores onCamelcasedEventName attributes', () => {
    const span = createElement('span', { onClick: () => console.log('XO'.repeat(50)) });

    expect(span.render()).toEqual('<span></span>');
  })
});

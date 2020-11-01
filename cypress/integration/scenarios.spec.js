/// <reference types="cypress" />
context('PhoneCat Application', () => {
  it('should redirect `index.html` to `index.html#!/phones', () => {
    cy.visit('/')
    cy.location().should((loc) => {
      expect(loc.hash).to.eq('#/phones')
    })
  })

  describe('View: Phone list', () => {
    const listSelector = '.phones .phone-list-item'
    const inputSeleector = 'input[name=query]'

    beforeEach(() => {
      cy.visit('index.html')
    })

    it('should filter the phone list as a user types into the search box', () => {
      cy.get(listSelector).should('have.length', 20)

      cy.get(inputSeleector)
        .type('nexus')
        .get(listSelector)
        .should('have.length', 1)

      cy.get(inputSeleector)
        .clear()
        .type('motorola')
        .get(listSelector)
        .should('have.length', 8)
    })

    it('should be possible to control phone order via the drop-down menu', () => {
      function getNames($list) {
        return $list
          .toArray()
          .map((el) => el.querySelector('img').getAttribute('alt'))
      }
      cy.get(inputSeleector)
        .type('tablet')
        .wait(500)
        .get(listSelector)
        .then(($list) => {
          expect(getNames($list)).to.eql([
            'Motorola XOOM\u2122 with Wi-Fi',
            'MOTOROLA XOOM\u2122',
          ])
        })

      cy.get('select[name=order]')
        .select('name')
        .wait(500)
        .get(listSelector)
        .then(($list) => {
          expect(getNames($list)).to.eql([
            'MOTOROLA XOOM\u2122',
            'Motorola XOOM\u2122 with Wi-Fi',
          ])
        })
    })

    it('should render phone specific links', () => {
      cy.get(inputSeleector)
        .type('nexus')
        .wait(500)
        .get('.phones li a')
        .first()
        .click()
        .then(() => {
          return cy.location()
        })
        .then((loc) => {
          expect(loc.hash).to.eq('#/phones/nexus-s')
        })
    })
  })

  describe('View: Phone detail', () => {
    beforeEach(() => {
      cy.visit('/#/phones/nexus-s')
    })

    it('should display the `nexus-s` page', () => {
      cy.get('.detail-container h1').should('have.text', 'Nexus S')
    })

    it('should display the first phone image as the main phone image', async () => {
      const $imageEl = await cy.get('.phone-images img.selected')
      expect($imageEl.attr('src')).to.match(/img\/phones\/nexus-s.0.jpg/)
    })

    it('should swap the main image when clicking on a thumbnail image', async () => {

      const $thumbnails = await cy.get('.phone-thumbs img')

      cy.wrap($thumbnails[2])
        .click()
        .wait(500)
        .get('.phone-images img.selected')
        .then(($el) => {
          expect($el.attr('src')).to.match(/img\/phones\/nexus-s.2.jpg/)
        })


      cy.wrap($thumbnails[0])
        .click()
        .wait(500)
        .get('.phone-images img.selected')
        .then(($el) => {
          expect($el.attr('src')).to.match(/img\/phones\/nexus-s.0.jpg/)
        })
    })
  })
})

describe('Post And Delete Quote', () => {
    const reqStub = cy.stub();
    cy.route({
      method: "POST",
      url: "https://typerz-api.herokuapp.com/quotes",
      onRequest: reqStub,
      status: 200
    })


    let currQuote;
    before(() => {
      cy.request('POST', 'https://typerz-api.herokuapp.com/quotes', {title: '별이 어쩌구', writer: '김어쩌구', quote: '내용 어쭈구 내용 내용 내용'})
      .its('body')
      .as('currentQuote')
      cy.get('@currentQuote')
      .then((quote) => {
        currQuote = quote;
      })
      
    })

    it('successfully posts', () => {
      cy.visit('/')
      cy.contains('별이 어쩌구')
    })

    it('successfully deletes', function() {
      const {_id: id, title} = currQuote;
      cy.request('DELETE', `https://typerz-api.herokuapp.com/quotes/${id}`)
      cy.visit('/')
    })
  })
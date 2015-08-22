describe('testing a wreqr channel', function(){
    beforeEach(function() {
        var channel = Backbone.Wreqr.radio.channel('ticketModule');

        this.callback = sinon.spy();
        channel.vent.on('quantity:changed', this.callback);

        this.model = new TicketModel(getTicketOptions('free','simple'));
        this.view = new TicketView({
            el: '.js-ticket-container',
            model: this.model
        }).render();
    });

    it('should broadcast the change', function() {
        expect(this.callback).not.toHaveBeenCalledOnce();
        $('select').val('3').trigger('change');
        expect(this.callback).toHaveBeenCalledOnce();
    });

});
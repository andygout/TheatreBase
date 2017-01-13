const expect = require('chai').expect;
const sinon = require('sinon');

const subject = require('../../../server/lib/get-page-data');

const Production = require('../../../server/models/production');
const Theatre = require('../../../server/models/theatre');

let productionStub;
let theatreStub;

const createStubs = () => {
	productionStub = sinon.createStubInstance(Production);
	theatreStub = sinon.createStubInstance(Theatre);
};

beforeEach(function () {
	createStubs();
});

describe('Get Page Data module', () => {

	describe('title property', () => {

		context('create action', () => {

			it('will read \'New <model>\'', () => {
				const pageData = subject(productionStub, 'create');
				expect(pageData.title).to.eq('New production');
			});

		});

		context('update action', () => {

			context('production instance', () => {

				it('will prioritise use of pageTitleText over title', () => {
					productionStub.title = 'Foo';
					productionStub.pageTitleText = 'Bar';
					const pageData = subject(productionStub, 'update');
					expect(pageData.title).to.eq('Bar');
				});

				it('will use title when pageTitleText absent', () => {
					productionStub.title = 'Foo';
					productionStub.pageTitleText = undefined;
					const pageData = subject(productionStub, 'update');
					expect(pageData.title).to.eq('Foo');
				});

			});

			context('theatre instance', () => {

				it('will prioritise use of pageTitleText over name', () => {
					theatreStub.name = 'Foo';
					theatreStub.pageTitleText = 'Bar';
					const pageData = subject(theatreStub, 'update');
					expect(pageData.title).to.eq('Bar');
				});

				it('will use name when pageTitleText absent', () => {
					theatreStub.name = 'Foo';
					theatreStub.pageTitleText = undefined;
					const pageData = subject(theatreStub, 'update');
					expect(pageData.title).to.eq('Foo');
				});

			});

		});

	});

	describe('modelName property', () => {

		it('will be the model name of the instance argument', () => {
			const pageData = subject(productionStub, 'create');
			expect(pageData.modelName).to.eq('PRODUCTION');
		});

	});

	describe('formAction property', () => {

		context('create action', () => {

			it('will be path comprised of pluralised model name', () => {
				const pageData = subject(productionStub, 'create');
				expect(pageData.formAction).to.eq('/productions');
			});

		});

		context('update action', () => {

			it('will be path comprised of pluralised model name and instance id', () => {
				productionStub.id = 1;
				const pageData = subject(productionStub, 'update');
				expect(pageData.formAction).to.eq('/productions/1');
			});

		});

	});

	describe('submitValue property', () => {

		context('create action', () => {

			it('will be comprised of action (\'Create\') and model name', () => {
				const pageData = subject(productionStub, 'create');
				expect(pageData.submitValue).to.eq('Create production');
			});

		});

		context('update action', () => {

			it('will be comprised of action (\'Update\') and model name', () => {
				const pageData = subject(productionStub, 'update');
				expect(pageData.submitValue).to.eq('Update production');
			});

		});

	});

	describe('alertText property', () => {

		context('instance does not have errors', () => {

			context('create action', () => {

				it('will be path comprised of past tense of action (\'Create\') and instance title', () => {
					productionStub.title = 'Foo';
					const pageData = subject(productionStub, 'create');
					expect(pageData.alertText).to.eq('PRODUCTION CREATED: Foo');
				});

			});

			context('update action', () => {

				it('will be path comprised of past tense of action (\'Update\') and instance title', () => {
					productionStub.title = 'Foo';
					const pageData = subject(productionStub, 'update');
					expect(pageData.alertText).to.eq('PRODUCTION UPDATED: Foo');
				});

			});

			context('delete action', () => {

				it('will be path comprised of past tense of action (\'Delete\') and instance title', () => {
					productionStub.title = 'Foo';
					const pageData = subject(productionStub, 'delete');
					expect(pageData.alertText).to.eq('PRODUCTION DELETED: Foo');
				});

			});

		});

		context('instance has errors', () => {

			context('create action', () => {

				it('will be path comprised of model name and \'Errors\'', () => {
					productionStub.hasError = true;
					const pageData = subject(productionStub, 'create');
					expect(pageData.alertText).to.eq('PRODUCTION ERRORS');
				});

			});

			context('update action', () => {

				it('will be path comprised of model name and \'Errors\'', () => {
					productionStub.hasError = true;
					const pageData = subject(productionStub, 'update');
					expect(pageData.alertText).to.eq('PRODUCTION ERRORS');
				});

			});

			context('delete action', () => {

				it('will be path comprised of model name and \'Errors\'', () => {
					productionStub.hasError = true;
					const pageData = subject(productionStub, 'delete');
					expect(pageData.alertText).to.eq('PRODUCTION ERRORS');
				});

			});

		});

	});

	describe('alertType property', () => {

		context('instance does not have errors', () => {

			it('will be \'success\'', () => {
				const pageData = subject(productionStub, 'create');
				expect(pageData.alertType).to.eq('success');
			});

		});

		context('instance has errors', () => {

			it('will be \'error\'', () => {
				productionStub.hasError = true;
				const pageData = subject(productionStub, 'create');
				expect(pageData.alertType).to.eq('error');
			});

		});

	});

});

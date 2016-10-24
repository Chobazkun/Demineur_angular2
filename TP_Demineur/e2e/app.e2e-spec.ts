import { TPDemineurPage } from './app.po';

describe('tp-demineur App', function() {
  let page: TPDemineurPage;

  beforeEach(() => {
    page = new TPDemineurPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

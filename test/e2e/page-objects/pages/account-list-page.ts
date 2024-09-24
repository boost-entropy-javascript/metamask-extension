import { Driver } from '../../webdriver/driver';

class AccountListPage {
  private driver: Driver;

  private accountListItem: string;

  private accountOptionsMenuButton: string;

  private hideUnhideAccountButton: string;

  private hiddenAccountsList: string;

  private hiddenAccountOptionsMenuButton: string;

  private pinnedIcon: string;

  private pinUnpinAccountButton: string;

  private createAccountButton: string;

  private addEthereumAccountButton: string;

  private accountNameInput: string;

  private addAccountConfirmButton: string;

  private accountMenuButton: string;

  private editableLabelButton: string;

  private editableLabelInput: string;

  private saveAccountLabelButton: string;

  private closeEditLabelButton: string;

  constructor(driver: Driver) {
    this.driver = driver;
    this.accountOptionsMenuButton =
      '[data-testid="account-list-item-menu-button"]';
    this.hideUnhideAccountButton = '[data-testid="account-list-menu-hide"]';
    this.pinUnpinAccountButton = '[data-testid="account-list-menu-pin"]';
    this.hiddenAccountsList = '[data-testid="hidden-accounts-list"]';
    this.pinnedIcon = '[data-testid="account-pinned-icon"]';
    this.hiddenAccountOptionsMenuButton =
      '.multichain-account-menu-popover__list--menu-item-hidden-account [data-testid="account-list-item-menu-button"]';
    this.createAccountButton =
      '[data-testid="multichain-account-menu-popover-action-button"]';
    this.addEthereumAccountButton =
      '[data-testid="multichain-account-menu-popover-add-account"]';
    this.accountNameInput = '#account-name';
    this.addAccountConfirmButton =
      '[data-testid="submit-add-account-with-name"]';
    this.accountMenuButton = '[data-testid="account-list-menu-details"]';
    this.editableLabelButton = '[data-testid="editable-label-button"]';
    this.editableLabelInput = '[data-testid="editable-input"] input';
    this.saveAccountLabelButton = '[data-testid="save-account-label-input"]';
    this.closeEditLabelButton = 'button[aria-label="Close"]';
    // this selector needs to be used in combination with an account label text.
    this.accountListItem = '.multichain-account-menu-popover__list--menu-item';
  }

  async check_pageIsLoaded(): Promise<void> {
    try {
      await this.driver.waitForMultipleSelectors([
        this.createAccountButton,
        this.accountOptionsMenuButton,
      ]);
    } catch (e) {
      console.log('Timeout while waiting for account list to be loaded', e);
      throw e;
    }
    console.log('Account list is loaded');
  }

  /**
   * Adds a new account with a custom label.
   *
   * @param customLabel - The custom label for the new account.
   */
  async addNewAccountWithCustomLabel(customLabel: string): Promise<void> {
    console.log(`Adding new account with custom label: ${customLabel}`);
    await this.driver.clickElement(this.createAccountButton);
    await this.driver.clickElement(this.addEthereumAccountButton);
    await this.driver.fill(this.accountNameInput, customLabel);
    await this.driver.clickElementAndWaitToDisappear(
      this.addAccountConfirmButton,
    );
  }

  /**
   * Changes the label of the current account.
   *
   * @param newLabel - The new label to set for the account.
   */
  async changeAccountLabel(newLabel: string): Promise<void> {
    console.log(`Changing account label to: ${newLabel}`);
    await this.driver.clickElement(this.accountMenuButton);
    await this.driver.clickElement(this.editableLabelButton);
    await this.driver.fill(this.editableLabelInput, newLabel);
    await this.driver.clickElement(this.saveAccountLabelButton);
    await this.driver.clickElement(this.closeEditLabelButton);
  }

  async hideAccount(): Promise<void> {
    console.log(`Hide account in account list`);
    await this.driver.clickElement(this.hideUnhideAccountButton);
  }

  async openAccountOptionsMenu(): Promise<void> {
    console.log(`Open account option menu`);
    await this.driver.clickElement(this.accountOptionsMenuButton);
  }

  async openHiddenAccountOptions(): Promise<void> {
    console.log(`Open hidden accounts options menu`);
    await this.driver.clickElement(this.hiddenAccountOptionsMenuButton);
  }

  async openHiddenAccountsList(): Promise<void> {
    console.log(`Open hidden accounts option menu`);
    await this.driver.clickElement(this.hiddenAccountsList);
  }

  async pinAccount(): Promise<void> {
    console.log(`Pin account in account list`);
    await this.driver.clickElement(this.pinUnpinAccountButton);
  }

  async unhideAccount(): Promise<void> {
    console.log(`Unhide account in account list`);
    await this.driver.clickElement(this.hideUnhideAccountButton);
  }

  async unpinAccount(): Promise<void> {
    console.log(`Unpin account in account list`);
    await this.driver.clickElement(this.pinUnpinAccountButton);
  }

  async switchToAccount(expectedLabel: string): Promise<void> {
    console.log(
      `Switch to account with label ${expectedLabel} in account list`,
    );
    await this.driver.clickElement({
      css: this.accountListItem,
      text: expectedLabel,
    });
  }

  /**
   * Check account is displayed in account list.
   *
   * @param expectedLabel - The expected account label to be displayed in accouunt list.
   */
  async check_accountDisplayedInAccountList(
    expectedLabel: string = 'Account',
  ): Promise<void> {
    console.log(
      `Check that account label ${expectedLabel} is displayed in account list`,
    );
    await this.driver.waitForSelector({
      css: this.accountListItem,
      text: expectedLabel,
    });
  }

  async check_accountIsPinned(): Promise<void> {
    console.log(`Check that account is pinned`);
    await this.driver.waitForSelector(this.pinnedIcon);
  }

  async check_accountIsUnpinned(): Promise<void> {
    console.log(`Check that account is unpinned`);
    await this.driver.assertElementNotPresent(this.pinnedIcon);
  }

  async check_hiddenAccountsListExists(): Promise<void> {
    console.log(`Check that hidden accounts list is displayed in account list`);
    await this.driver.waitForSelector(this.hiddenAccountsList);
  }
}

export default AccountListPage;

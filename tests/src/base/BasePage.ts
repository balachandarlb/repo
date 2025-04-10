import { Locator, Page } from "@playwright/test";
import { AriaRoles } from "../types/aria-roles";

export default class BasePage {
  constructor(protected page: Page) {}

  protected $(selector: string): Locator {
    return this.page.locator(selector);
  }            

  protected $role(role: AriaRoles): Locator;
  protected $role(role: AriaRoles, name: string): Locator;

  protected $role(role: AriaRoles, name?: string): Locator {
    if (name) {
      return this.page.getByRole(role, { name });
    } else {
      return this.page.getByRole(role); 
  }
}
}
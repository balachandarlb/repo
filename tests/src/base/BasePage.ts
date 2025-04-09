import { Locator, Page } from "@playwright/test";
import { AriaRoles } from "../types/aria-roles";

export default class BasePage {
  constructor(protected page: Page) {}

  protected $(selector: string): Locator {
    return this.page.locator(selector);
  }            

  protected $role(role: AriaRoles, name: string): Locator {
    return this.page.getByRole(role, { name });
  }
}
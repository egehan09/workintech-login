describe("Login Form Validation Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("should submit form and navigate to /success on valid input", () => {
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("Abc123..");
    cy.get('input[name="terms"]').check();
    cy.get("button").should("not.be.disabled").click();

    cy.url().should("include", "/success");
    cy.contains("success").should("be.visible");
  });

  it("should show error message and disable button when email is invalid", () => {
    cy.get('input[name="email"]').type("invalidemail");
    cy.get('input[name="password"]').type("Abc123..");
    cy.get('input[name="terms"]').check();

    cy.get("button").should("be.disabled");
    cy.get(".invalid-feedback").should("have.length", 1);
    cy.contains("Please enter a valid email address").should("be.visible");
  });

  it("should show both email and password error messages", () => {
    cy.get('input[name="email"]').type("bademail");
    cy.get('input[name="password"]').type("123");
    cy.get('input[name="terms"]').check();

    cy.get("button").should("be.disabled");
    cy.get(".invalid-feedback").should("have.length", 2);
    cy.contains("Please enter a valid email address").should("be.visible");
    cy.contains("Password must be strong").should("be.visible");
  });

  it("should disable button when terms are not accepted", () => {
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("Abc123!");

    cy.get("button").should("be.disabled");
  });
});

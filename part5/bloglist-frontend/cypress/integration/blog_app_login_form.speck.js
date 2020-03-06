describe("Blog app", function() {
  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user = {
      username: "helloworld2",
      password: "helloworld222"
    };
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:3000");
    const user2 = {
      username: "fakeuser",
      password: "fakeuser123"
    };
    cy.request("POST", "http://localhost:3003/api/users", user2);
    cy.visit("http://localhost:3000");
  });

  // 5.17
  it("should show login form", function() {
    cy.get(".form-login");
    cy.get("input[name=username]");
    cy.get("input[name=password]");
    cy.contains("Login");
  });

  // 5.18
  describe("Login", function() {
    it("should succeed with corrent credentials", function() {
      cy.get(".form-login");
      cy.get("input[name=username]").type("helloworld2");
      cy.get("input[name=password]").type("helloworld222");
      cy.contains("Login").click();

      cy.get(".subtitle-login-info").should("contain", "helloworld2");
    });

    it("should fail with wrong credentials", function() {
      cy.get("input[name=username]").type("hello");
      cy.get("input[name=password]").type("helloworld");
      cy.contains("Login").click();

      cy.get(".error")
        .should("contain", "incorrect username or password!")
        .and("have.css", "color", "rgb(186, 16, 124)");

      cy.get("html").should("not.contain", "Hi!");
    });
  });

  describe("when logged in", function() {
    beforeEach(function() {
      cy.login({
        username: "helloworld2",
        password: "helloworld222"
      });
    });

    // 5.19
    it("should be able to create a new blog that to be shown on the blog list", function() {
      cy.contains("New Blog").click();
      cy.get("#title").type("e2e testing");
      cy.get("#author").type("Mars");
      cy.get("#url").type("https://test.test");
      cy.get(".submit-btn").click();

      cy.get(".success").should("contain", "success!");
      cy.get(".blog-list-title")
        .should("contain", "e2e testing")
        .should("contain", "Mars")
        .should("not.contain", "https://test.test");
    });

    // 5.20
    describe("a blog exists", function() {
      beforeEach(function() {
        cy.createBlog({
          title: "first blog",
          author: "Mars",
          url: "https://first.net"
        });
      });

      it("should be able to click the likes button by users", function() {
        cy.get(".blog-list-toggle").click();
        cy.get(".like-btn").click();

        cy.get(".success").should("contain", "Success!");
        cy.visit("http://localhost:3000");
        cy.get(".blog-list-toggle").click();
        cy.get(".likes").should("contain", "1");
      });

      // 5.21
      it("should be deleted successfully when a user is the creator", () => {
        cy.get(".blog-list-toggle").click();
        cy.get(".delete-btn").click();
        cy.contains("first blog").should("not.exist");
      });

      it("should not be deleted when the user is not the creator", () => {
        cy.login({ username: "fakeuser", password: "fakeuser123" });
        cy.get(".subtitle-login-info").should("contain", "fakeuser");

        cy.get(".blog-list-toggle").click();
        cy.get(".delete-btn").click();
        cy.get(".error").should("contain", "Error");
      });
    });

    //5.22
    describe("some blogs exist", function() {
      beforeEach(function() {
        cy.createBlog({
          title: "first blog",
          author: "Mars",
          url: "https://first.net"
        });
        cy.createBlog({
          title: "second blog",
          author: "Sun",
          url: "https://second.net"
        });
      });
    });
  });
});

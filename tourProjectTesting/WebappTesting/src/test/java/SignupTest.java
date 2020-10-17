import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Order;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

import java.util.concurrent.TimeUnit;


public class SignupTest {
    private static ChromeDriver driver;

    @BeforeAll
    public static void setup() {
        System.setProperty("Webdriver.chrome.driver", "chromedriver.exe");
        driver = new ChromeDriver();
    }

    @Test
    @Order(1)
    public void CheckSignUpPage() {
        driver.get("http://localhost:3000/register");
        Assert.assertTrue(driver.findElement(By.xpath("//*[text()='Sign Up']")).isDisplayed());
    }

    @Test
    @Order(2)
    public void SubmitSignupInfo(){
        driver.findElement(By.name("username")).sendKeys("testUser2");
        driver.findElement(By.name("password")).sendKeys("password");
        driver.findElement(By.name("passwordConfirm")).sendKeys("password");
        new Select(driver.findElement(By.name("role"))).selectByVisibleText("User");
        driver.findElement(By.id("submit")).click();
        driver.manage().timeouts().implicitlyWait(2, TimeUnit.SECONDS);;
        Assert.assertTrue(driver.findElement(By.xpath("//*[text()='Log In']")).isDisplayed());
    }

    @BeforeTest
    public void beforeTest() {
        driver = new ChromeDriver();
    }
    @AfterTest
    public void afterTest() {
        driver.quit();
    }
}

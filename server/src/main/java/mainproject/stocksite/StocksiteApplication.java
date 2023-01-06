package mainproject.stocksite;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
@EnableJpaAuditing
@SpringBootApplication
public class StocksiteApplication {

	public static void main(String[] args) {
		SpringApplication.run(StocksiteApplication.class, args);
	}

}

package mainproject.stocksite;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class StocksiteApplication {

	public static void main(String[] args) {
		SpringApplication.run(StocksiteApplication.class, args);
	}
}

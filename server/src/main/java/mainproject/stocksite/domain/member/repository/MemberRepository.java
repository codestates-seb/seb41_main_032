package mainproject.stocksite.domain.member.repository;

import mainproject.stocksite.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

}


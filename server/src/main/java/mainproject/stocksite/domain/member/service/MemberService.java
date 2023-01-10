package mainproject.stocksite.domain.member.service;


import mainproject.stocksite.domain.auth.utils.CustomAuthorityUtils;
import mainproject.stocksite.domain.member.entity.Member;
import mainproject.stocksite.domain.member.repository.MemberRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.List;

@Transactional
@Service
public class MemberService {

    private final MemberRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    public MemberService(MemberRepository repository, PasswordEncoder passwordEncoder, CustomAuthorityUtils authorityUtils) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
    }


    public Member addMember(Member member) {

        // 패스워드를 단방향 암호화
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        // DB에 User Role 저장
        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        Member savedMember = repository.save(member);

        return savedMember;
    }

    public List<Member> getMembers() {
        return repository.findAll();
    }

    public Member findById(Long MemberId) {
        Optional<Member> findMember = repository.findById(MemberId);
        return findMember.orElseThrow(() -> new NoSuchElementException("No Such Member"));
    }

    public void deleteMember(Long memberId) {
        repository.deleteById(memberId);
    }

    public Member modifyMember(Long memberId, Member member) {
        Member findMember = findById(memberId);
        updateMemberInfo(member, findMember);
        return findMember;
    }


    private void updateMemberInfo(Member member, Member findMember) {
        findMember.setUsername(member.getUsername());
        findMember.setNickname(member.getNickname());
        findMember.setPassword(member.getPassword());
        findMember.setEmail(member.getEmail());
    }



}



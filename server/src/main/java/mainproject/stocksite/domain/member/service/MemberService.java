package mainproject.stocksite.domain.member.service;


import lombok.RequiredArgsConstructor;
import mainproject.stocksite.domain.member.entity.Member;
import mainproject.stocksite.domain.member.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.List;

@Transactional
@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository repository;


    public Member addMember(Member member) {
        return repository.save(member);
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
        findMember.setUserId(member.getUserId());
        findMember.setNickname(member.getNickname());
        findMember.setPassword(member.getPassword());
        findMember.setEmail(member.getEmail());
    }



}



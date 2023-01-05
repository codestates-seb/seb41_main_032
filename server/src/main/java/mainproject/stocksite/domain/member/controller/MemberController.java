package mainproject.stocksite.domain.member.controller;


import lombok.RequiredArgsConstructor;
import mainproject.stocksite.domain.member.dto.MemberPostDto;
import mainproject.stocksite.domain.member.dto.MemberResponseDto;
import mainproject.stocksite.domain.member.entity.Member;
import mainproject.stocksite.domain.member.mapper.MemberMapper;
import mainproject.stocksite.domain.member.service.MemberService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;

import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService service;

    private final MemberMapper mapper;


    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public MemberResponseDto post(@RequestBody @Validated MemberPostDto memberPostDto) {
        Member member = mapper.memberPostDtoToEntity(memberPostDto);
        Member addMember = service.addMember(member);
        MemberResponseDto memberResponseDto = mapper.memberToResponseDto(addMember);

        return memberResponseDto;
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping
    public List<MemberResponseDto> getAll() {
        List<Member> members = service.getMembers();
        return members.stream().map(member -> mapper.memberToResponseDto(member))
                .collect(Collectors.toList());
    }

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{memberId}")
    public MemberResponseDto getOne(@PathVariable Long memberId) {
        return mapper.memberToResponseDto(service.findById(memberId));
    }

    @ResponseStatus(HttpStatus.OK)
    @PatchMapping("/{memberId}")
    public MemberResponseDto patchOne(@PathVariable Long memberId,
            @RequestBody @Validated MemberPostDto memberPostDto) {
        Member modifyMember = service.modifyMember(memberId, mapper.memberPostDtoToEntity(memberPostDto));
        return mapper.memberToResponseDto(modifyMember);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{memberId}")
    public void deleteUser(@PathVariable Long memberId) {
        service.deleteMember(memberId);
    }

}

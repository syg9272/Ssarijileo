package com.ssafy.ssarijileo.api.song.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.ssarijileo.api.song.dto.SongDetailDto;
import com.ssafy.ssarijileo.api.song.dto.SongDto;
import com.ssafy.ssarijileo.api.song.service.SongService;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("api/v1/song")
@RequiredArgsConstructor // private final 변수에 의존성 주입 (@Autowired 대체)
public class SongController {

	private final SongService songService;

	/**
	 * 노래 목록
	 * @return
	 */
	@ApiOperation(
		value = "노래 목록",
		notes = "노래 전체 목록을 조회한다."
	)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공"),
		@ApiResponse(code = 401, message = "인증 실패"),
		@ApiResponse(code = 404, message = "노래 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@GetMapping
	public ResponseEntity<List<SongDto>> findAllSong() {
		return ResponseEntity.status(200).body(songService.findAllSong());
	}

	/**
	 * 노래 상세 목록
	 * @return
	 */
	@ApiOperation(
		value = "노래 상세 목록",
		notes = "가사와 음정을 포함한 노래 전체 목록을 조회한다."
	)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공"),
		@ApiResponse(code = 401, message = "인증 실패"),
		@ApiResponse(code = 404, message = "노래 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@GetMapping("/detail")
	public ResponseEntity<List<SongDetailDto>> findAllSongDetail() {
		return ResponseEntity.status(200).body(songService.findAllSongDetail());
	}

	/**
	 * 노래 상세 정보
	 * @param songId
	 * @return
	 */
	@ApiOperation(
		value = "노래 상세 정보",
		notes = "노래 ID를 통해 가사와 음정을 포함한 노래 정보를 조회한다."
	)
	@ApiImplicitParam(
		name = "songId",
		value = "노래 PK"
	)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공"),
		@ApiResponse(code = 401, message = "인증 실패"),
		@ApiResponse(code = 404, message = "노래 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@GetMapping("/detail/{songId}")
	public ResponseEntity<SongDetailDto> findSongDetailById(@PathVariable Long songId) {
		return ResponseEntity.status(200).body(songService.findSongDetailById(songId));
	}

	/**
	 * 내 애창곡 목록
	 * @return
	 */
	@ApiOperation(
		value = "내 애창곡 목록",
		notes = "사용자 ID를 통해 애창곡 목록을 조회한다."
	)
	@ApiResponses({
		@ApiResponse(code = 200, message = "성공"),
		@ApiResponse(code = 401, message = "인증 실패"),
		@ApiResponse(code = 404, message = "노래 없음"),
		@ApiResponse(code = 500, message = "서버 오류")
	})
	@GetMapping("/my/{userId}")
	public ResponseEntity<List<SongDto>> findSongByUserId(@PathVariable String userId) {
		return ResponseEntity.status(200).body(songService.findSongByUserId(userId));
	}
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class photosController extends Controller
{
	public function index(){
		$data = [
			0 => [
				'id' => 1,
				'source' => 'images/picture1',
				'text' => 'this is picture one text',
			],
			1 => [
				'id' => 2,
				'source' => 'images/picture2',
				'text' => 'this is picture two text',
			]
		];


		dd($data[0]);

		dd($data['picture1']['source']);



		return $data;
	}
}

<?php

use Illuminate\Http\Request;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'indexController@index')->name('index');
Route::get('/test-route', 'indexController@test' )->name('test');
Route::get('/zalneor/get', 'zalneorController@index')->name('zalneor');
Route::get('/photos/get', 'zalneorController@index')->name('photos.get');
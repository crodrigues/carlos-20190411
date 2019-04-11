<?php

use Illuminate\Http\Request;
use Illuminate\Http\Response;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::get('/list', function () {
    return response()->json(App\Document::all());
});

Route::post('/save', function (Request $request) {
    try {
        if (!$request->hasFile('document')) {
            throw new Exception('Missing uploaded document');
        }

        $file = $request->file('document');
        $path = $file->store('documents');

        $document = App\Document::create([
            'hash' => md5($path),
            'filename' => $file->getClientOriginalName(),
            'size' => $file->getSize(),
            'mime_type' => $file->getMimeType(),
            'path' => $path,
        ]);

        return response()->json($document, Response::HTTP_OK);
    } catch (Exception $e) {
        return response('', Response::HTTP_BAD_REQUEST);
    }
});

Route::get('/delete/{hash}', function (string $hash) {
    App\Document::deleteByHash($hash);

    return response('', Response::HTTP_OK);
});

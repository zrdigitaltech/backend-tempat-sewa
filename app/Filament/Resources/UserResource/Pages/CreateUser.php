<?php

namespace App\Filament\Resources\UserResource\Pages;

use App\Filament\Resources\UserResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Database\Eloquent\Model;
use App\Models\Keanggotaan;

class CreateUser extends CreateRecord
{
  protected static string $resource = UserResource::class;

  protected static bool $canCreateAnother = false;

  protected function afterCreate(): void
  {
    $data = $this->form->getState();

    if (!empty($data['id_paketkeanggotaan'])) {
      Keanggotaan::create([
        'id_user' => $this->record->id,
        'id_paketkeanggotaan' => $data['id_paketkeanggotaan'],
        'tanggal_mulai' => now(),
        'tanggal_berakhir' => now()->addMonths(1), // opsional
        'aktif' => true,
      ]);
    }
  }
}

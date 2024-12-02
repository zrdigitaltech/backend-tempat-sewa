<?php

namespace App\Filament\Resources\PelangganResource\Pages;

use App\Filament\Resources\PelangganResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Database\Eloquent\Model;

class CreatePelanggan extends CreateRecord
{
  protected static string $resource = PelangganResource::class;

  protected static bool $canCreateAnother = false;

  protected function handleRecordCreation(array $data): Model
  {
    // Buat pengguna baru
    $user = static::getModel()::create($data);

    // Tetapkan role 'pelanggan' ke pengguna
    $user->assignRole('pelanggan');

    return $user;
  }
}

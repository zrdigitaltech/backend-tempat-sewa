<?php

namespace App\Filament\Resources;

use App\Filament\Resources\KontrakanResource\Pages;
use App\Filament\Resources\KontrakanResource\RelationManagers;
use App\Models\Kontrakan;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Card;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextArea;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;

use Filament\Tables\Actions\ViewAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Actions\CreateAction;

use Illuminate\Support\Str;
use Filament\Infolists\Components\TextEntry;
use Filament\Tables\Filters\SelectFilter;
use Filament\Support\RawJs;
use Filament\Tables\Enums\FiltersLayout;
use Filament\Tables\Filters\Filter;

class WebKontrakanResource extends Resource
{
  protected static ?string $model = Kontrakan::class;
  protected static ?string $navigationIcon = 'heroicon-o-building-library';
  protected static ?int $navigationSort = 0;
  protected static ?string $slug = 'data-kontrakan';

  public static function getNavigationLabel(): string
  {
    return __('Data Kontrakan');
  }

  public static function getNavigationGroup(): ?string
  {
    return __('Admin Web');
  }
}

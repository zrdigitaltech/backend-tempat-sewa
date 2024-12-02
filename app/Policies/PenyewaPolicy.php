<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Penyewa;
use Illuminate\Auth\Access\HandlesAuthorization;

class PenyewaPolicy
{
  use HandlesAuthorization;

  /**
   * Determine whether the user can view any models.
   */
  public function viewAny(User $user): bool
  {
    return $user->can('view_any_penyewa');
  }

  /**
   * Determine whether the user can view the model.
   */
  public function view(User $user, Penyewa $penyewa): bool
  {
    return $user->can('view_penyewa');
  }

  /**
   * Determine whether the user can create models.
   */
  public function create(User $user): bool
  {
    return $user->can('create_penyewa');
  }

  /**
   * Determine whether the user can update the model.
   */
  public function update(User $user, Penyewa $penyewa): bool
  {
    return $user->can('update_penyewa');
  }

  /**
   * Determine whether the user can delete the model.
   */
  public function delete(User $user, Penyewa $penyewa): bool
  {
    return $user->can('delete_penyewa');
  }

  /**
   * Determine whether the user can bulk delete.
   */
  public function deleteAny(User $user): bool
  {
    return $user->can('delete_any_penyewa');
  }

  /**
   * Determine whether the user can permanently delete.
   */
  public function forceDelete(User $user, Penyewa $penyewa): bool
  {
    return $user->can('force_delete_penyewa');
  }

  /**
   * Determine whether the user can permanently bulk delete.
   */
  public function forceDeleteAny(User $user): bool
  {
    return $user->can('force_delete_any_penyewa');
  }

  /**
   * Determine whether the user can restore.
   */
  public function restore(User $user, Penyewa $penyewa): bool
  {
    return $user->can('restore_penyewa');
  }

  /**
   * Determine whether the user can bulk restore.
   */
  public function restoreAny(User $user): bool
  {
    return $user->can('restore_any_penyewa');
  }

  /**
   * Determine whether the user can replicate.
   */
  public function replicate(User $user, Penyewa $penyewa): bool
  {
    return $user->can('replicate_penyewa');
  }

  /**
   * Determine whether the user can reorder.
   */
  public function reorder(User $user): bool
  {
    return $user->can('reorder_penyewa');
  }
}
